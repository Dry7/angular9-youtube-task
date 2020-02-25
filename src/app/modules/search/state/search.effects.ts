import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  SearchVideosLoading,
  SearchVideosComplete,
  UpdateQuery,
  SearchVideos,
  SearchVideosNextPage,
  SearchVideosCompleteLastPage,
  SearchVideosFailed
} from './search.actions';
import { of } from 'rxjs';
import { AppState, selectNavigation } from './index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

const ERROR_DURATION = 5_000;

@Injectable()
export class SearchEffects {
  searchVideosLoading$ = createEffect(() => this.action$.pipe(
      ofType(SearchVideosLoading),
      switchMap(action => this.service.searchVideos(action.query, action.limit, action.nextPage).pipe(
        map(response => SearchVideosComplete({ response })),
        catchError((error: Error) => of(SearchVideosFailed({error})))
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

  searchVideosFailed$ = createEffect(() => this.action$.pipe(
    ofType(SearchVideosFailed),
    tap(action => this.snackBar.open(action.error.message, null, {duration: ERROR_DURATION})),
    map(() => SearchVideosCompleteLastPage()),
  ));

  constructor(
    private readonly action$: Actions,
    private readonly service: YoutubeService,
    private readonly store$: Store<AppState>,
    private readonly snackBar: MatSnackBar,
  ) {}
}
