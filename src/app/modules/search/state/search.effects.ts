import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  SearchVideosLoading,
  SearchVideosComplete,
  UpdateQuery,
  SearchVideos,
  SearchVideosNextPage,
  SearchVideosCompleteLastPage
} from './search.actions';
import { EMPTY } from 'rxjs';
import { AppState, selectNavigation } from './index';
import { select, Store } from '@ngrx/store';

@Injectable()
export class SearchEffects {
  searchVideosLoading$ = createEffect(() => this.action$.pipe(
      ofType(SearchVideosLoading),
      switchMap(action => this.service.searchVideos(action.query, action.limit, action.nextPage).pipe(
        map(response => SearchVideosComplete({ response })),
        catchError(() => EMPTY)
        )
      )
    )
  );

  searchVideos$ = createEffect(() => this.action$.pipe(
    ofType(SearchVideos, UpdateQuery),
    withLatestFrom(this.store$.pipe(select(selectNavigation))),
    map(([, navigation]) => SearchVideosLoading(navigation))
  ));

  searchVideosNextPage$ = createEffect(() => this.action$.pipe(
    ofType(SearchVideosNextPage),
    withLatestFrom(this.store$.pipe(select(selectNavigation))),
    filter(([, navigation]) => navigation.nextPage !== undefined),
    map(([, navigation]) => SearchVideosLoading(navigation))
  ));

  searchVideosNextPageStopLoading$ = createEffect(() => this.action$.pipe(
    ofType(SearchVideosNextPage),
    withLatestFrom(this.store$.pipe(select(selectNavigation))),
    filter(([, navigation]) => navigation.nextPage === undefined),
    map(([, navigation]) => SearchVideosCompleteLastPage())
  ));

  constructor(
    private action$: Actions,
    private service: YoutubeService,
    private store$: Store<AppState>,
  ) {}
}
