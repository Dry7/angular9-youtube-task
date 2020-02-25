import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { async, TestBed } from '@angular/core/testing';
import { SearchComponent } from '../pages/search/search.component';
import { MockSearchFilterComponent } from '../../../tests/mocks/search-filter';
import { MockVideoListComponent } from '../../../tests/mocks/video-list';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from './search.reducers';
import { provideMockActions } from '@ngrx/effects/testing';
import { SearchEffects } from './search.effects';
import {
  SearchVideos,
  SearchVideosComplete,
  SearchVideosCompleteLastPage,
  SearchVideosFailed,
  SearchVideosNextPage,
  UpdateQuery
} from './search.actions';
import { AppState, selectNavigation } from './index';
import { cold, hot } from 'jasmine-marbles';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchVideosLoading } from './search.actions';
import { YoutubeService } from '../services/youtube.service';
import response from '../../../tests/fixtures/response';

const NAVIGATION = {query: '', limit: 50, nextPage: null};

describe('SearchEffects', () => {
  const youtubeService = { searchVideos: jest.fn() };
  let httpMock: HttpTestingController;
  let actions$: Observable<Action>;
  let store: MockStore<AppState>;
  let effects: SearchEffects;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent, MockSearchFilterComponent, MockVideoListComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        SearchEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState}),
        { provide: YoutubeService, useValue: youtubeService },
      ],
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.get<Store>(Store);
    effects = TestBed.inject<SearchEffects>(SearchEffects);
  }));

  describe('searchVideosLoading$', () => {
    beforeEach(() => {
      store.overrideSelector(selectNavigation, NAVIGATION);
    });

    it('SearchVideosLoading return service response', () => {
      youtubeService.searchVideos.mockReturnValueOnce(of(response));

      actions$ = hot('-a', {a: SearchVideosLoading(NAVIGATION)});

      expect(effects.searchVideosLoading$).toBeObservable(hot('-r', {r: SearchVideosComplete({response})}));
    });

    it('SearchVideosLoading return service failed', () => {
      const error = new Error('error');

      youtubeService.searchVideos.mockReturnValue(cold('#', {}, error));

      actions$ = hot('----a', {a: SearchVideosLoading(NAVIGATION)});

      expect(effects.searchVideosLoading$).toBeObservable(hot('----e', {e: SearchVideosFailed({error})}));
    });
  });

  describe('searchVideos$', () => {
    beforeEach(() => {
      store.overrideSelector(selectNavigation, NAVIGATION);
    });

    it('SearchVideos', () => {
      const loading = SearchVideosLoading(NAVIGATION);

      actions$ = hot('--a', {a: SearchVideos()});

      expect(effects.searchVideos$).toBeObservable(hot('--l', {l: loading}));
    });

    it('UpdateQuery', () => {
      const loading = SearchVideosLoading(NAVIGATION);

      actions$ = hot('--a', {a: UpdateQuery({query: 'test'})});

      expect(effects.searchVideos$).toBeObservable(hot('--l', {l: loading}));
    });

    it('skip another actions', () => {
      actions$ = hot('--a', {a: SearchVideosCompleteLastPage()});

      expect(effects.searchVideos$).toBeObservable(hot(''));
    });
  });

  describe('searchVideosNextPage$', () => {
    it('SearchVideosNextPage with nextPage', () => {
      const navigation = {query: '', limit: 50, nextPage: 'CBQQAA'};
      const loading = SearchVideosLoading(navigation);
      store.overrideSelector(selectNavigation, navigation);

      actions$ = hot('--a', {a: SearchVideosNextPage()});

      expect(effects.searchVideosNextPage$).toBeObservable(hot('--l', {l: loading}));
    });

    it('SearchVideosNextPage without nextPage', () => {
      const navigation = {query: '', limit: 50, nextPage: undefined};
      const loading = SearchVideosLoading(navigation);
      store.overrideSelector(selectNavigation, navigation);

      actions$ = hot('--a', {a: SearchVideosNextPage()});

      expect(effects.searchVideosNextPage$).toBeObservable(hot(''));
    });

    it('skip another actions', () => {
      store.overrideSelector(selectNavigation, NAVIGATION);
      actions$ = hot('--a', {a: SearchVideosCompleteLastPage()});

      expect(effects.searchVideosNextPage$).toBeObservable(hot(''));
    });
  });

  describe('searchVideosNextPageStopLoading$', () => {
    it('searchVideosNextPageStopLoading$ with nextPage', () => {
      const navigation = {query: '', limit: 50, nextPage: 'CBQQAA'};
      const loading = SearchVideosLoading(navigation);
      store.overrideSelector(selectNavigation, navigation);

      actions$ = hot('--a', {a: SearchVideosNextPage()});

      expect(effects.searchVideosNextPageStopLoading$).toBeObservable(hot(''));
    });

    it('searchVideosNextPageStopLoading$ without nextPage', () => {
      const navigation = {query: '', limit: 50, nextPage: undefined};
      const loading = SearchVideosCompleteLastPage();
      store.overrideSelector(selectNavigation, navigation);

      actions$ = hot('--a', {a: SearchVideosNextPage()});

      expect(effects.searchVideosNextPageStopLoading$).toBeObservable(hot('--l', {l: loading}));
    });

    it('skip another actions', () => {
      store.overrideSelector(selectNavigation, NAVIGATION);
      actions$ = hot('--a', {a: SearchVideosCompleteLastPage()});

      expect(effects.searchVideosNextPageStopLoading$).toBeObservable(hot(''));
    });
  });
});
