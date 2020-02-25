import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesComponent } from './favourites.component';
import { MockVideoListComponent } from '../../../../tests/mocks/video-list';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../state';
import { Store } from '@ngrx/store';
import videos from '../../../../tests/fixtures/videos';
import { ToggleFavourites } from '../../state/search.actions';
import { initialState as initialSearchState } from '../../state/search.reducers';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;
  let store: MockStore<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritesComponent, MockVideoListComponent ],
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
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass data from state to component', () => {
    store.setState({
      search: {
        ...initialSearchState,
        favourites: {
          selected: videos.map(video => video.id.videoId),
          items: videos.reduce((object, current) => ({...object, [current.id.videoId]: current}), {}),
        }
      }
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('Рейнджерс - Сан-Хосе: 23 февраля 2020, Обзор матча...');
    expect(fixture.nativeElement.innerHTML).toContain(
      'Как сложилась жизнь автора песни «Белая стрекоза любви» Николая Воронова / НЕЗАБЫТЫЕ ИСТОРИИ'
    );
    expect(fixture.nativeElement.innerHTML).toContain('Skoda Karoq стала лучше потому что в неё добавили ...');
    expect(fixture.nativeElement.innerHTML).toContain('TRIaCrDxb2M');
    expect(fixture.nativeElement.innerHTML).toContain('lzobp0hC6Hk');
    expect(fixture.nativeElement.innerHTML).toContain('yvWgDonpIXc');
  });

  it('should dispatch action when toggleFavourites run', () => {
    const spy = jest.spyOn(store, 'dispatch');

    component.toggleFavourites(videos[0]);

    expect(spy).toHaveBeenNthCalledWith(1, ToggleFavourites({item: videos[0]}));
  });
});
