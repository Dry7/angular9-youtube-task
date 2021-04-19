import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import videos from '../../../../tests/fixtures/videos';
import { SearchVideos, SearchVideosNextPage, ToggleFavourites, UpdateQuery } from '../../state/search.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../state';
import { initialState as initialSearchState } from '../../state/search.reducers';
import { MockVideoListComponent } from '../../../../tests/mocks/video-list';
import { Store } from '@ngrx/store';
import { MockSearchFilterComponent } from '../../../../tests/mocks/search-filter';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: MockStore<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent, MockSearchFilterComponent, MockVideoListComponent ],
      providers: [
        provideMockStore({initialState: {
            search: initialSearchState,
          }}),
      ]
    })
    .compileComponents();

    store = TestBed.get<Store>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should pass data from state to component', () => {
    const items = videos.slice(0, 2);
    store.setState({
      search: {
        ...initialSearchState,
        items,
        favourites: {
          ...initialSearchState.favourites,
          selected: items.map(video => video.id.videoId),
        }
      }
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('Рейнджерс - Сан-Хосе: 23 февраля 2020, Обзор матча...');
    expect(fixture.nativeElement.innerHTML).toContain(
      'Как сложилась жизнь автора песни «Белая стрекоза любви» Николая Воронова / НЕЗАБЫТЫЕ ИСТОРИИ'
    );
    expect(fixture.nativeElement.innerHTML).toContain('TRIaCrDxb2M');
    expect(fixture.nativeElement.innerHTML).toContain('lzobp0hC6Hk');

    store.setState({
      search: {
        ...initialSearchState,
        items: [],
        favourites: {
          ...initialSearchState.favourites,
          selected: items.map(video => video.id.videoId),
        }
      }
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('<app-video-list ng-reflect-items=""');
  });

  it('should change loading', () => {
    store.setState({search: {...initialSearchState, loading: false}});
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('loading="false"');

    store.setState({search: {...initialSearchState, loading: true}});
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('loading="true"');
  });

  it('should update query when query changed', fakeAsync(() => {
    const spy = jest.spyOn(store, 'dispatch');
    const query = component.form.controls.query;

    fixture.detectChanges();
    query.setValue('Angular9'); tick(401);

    fixture.detectChanges();

    expect(spy).toHaveBeenNthCalledWith(1, UpdateQuery({query: 'Angular9'}));
  }));

  it('should dont update query in query dont changed', fakeAsync(() => {
    fixture.detectChanges();
    const spy = jest.spyOn(store, 'dispatch');
    const query = component.form.controls.query;

    query.setValue('Angular2'); tick(401);
    query.setValue('Angular2'); tick(401);
    query.setValue('Angular2');

    fixture.detectChanges();
    expect(spy).toHaveBeenNthCalledWith(1, UpdateQuery({query: 'Angular2'}));
  }));

  it('should use debounce time when update query', fakeAsync(() => {
    fixture.detectChanges();
    const spy = jest.spyOn(store, 'dispatch');
    const query = component.form.controls.query;

    query.setValue('Angular1'); tick(200);
    query.setValue('Angular2'); tick(200);
    query.setValue('Angular3'); tick(200);
    query.setValue('Angular4'); tick(300);
    query.setValue('Angular5');

    discardPeriodicTasks();
    fixture.detectChanges();
    expect(spy).toHaveBeenNthCalledWith(1, UpdateQuery({query: 'Angular4'}));
  }));

  it('should pass query from state to form', () => {
    store.setState({search: {...initialSearchState, navigation: {...initialSearchState.navigation, query: ''}}});

    fixture.detectChanges();

    expect(component.form.value.query).toEqual('');

    store.setState({search: {...initialSearchState, navigation: {...initialSearchState.navigation, query: 'Блины'}}});

    fixture.detectChanges();

    expect(component.form.value.query).toEqual('Блины');
  });

  it('should dispatch SearchVideos action when search run', () => {
    const spy = jest.spyOn(store, 'dispatch');

    component.search();

    expect(spy).toHaveBeenNthCalledWith(1, SearchVideos());
  });

  it('should dispatch SearchVideosNextPage action when next run', () => {
    const spy = jest.spyOn(store, 'dispatch');

    component.next();

    expect(spy).toHaveBeenNthCalledWith(1, SearchVideosNextPage());
  });

  it('should dispatch action when toggleFavourites run', () => {
    const spy = jest.spyOn(store, 'dispatch');

    component.toggleFavourites(videos[0]);

    expect(spy).toHaveBeenNthCalledWith(1, ToggleFavourites({item: videos[0]}));
  });
});
