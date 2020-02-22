import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { SearchVideos, SearchVideosComplete, SearchVideosNextPage } from './search.actions';
import { EMPTY, of } from 'rxjs';
import { AppState, selectNextPageToken } from './index';
import { select, Store } from '@ngrx/store';

@Injectable()
export class SearchEffects {
  searchVideos$ = createEffect(() => this.action$.pipe(
      ofType(SearchVideos),
      mergeMap(action => this.service.searchVideos(action.limit, action.nextPage).pipe(
        map(response => SearchVideosComplete({ response })),
        catchError(() => EMPTY)
        )
      )
    )
  );

  searchVideosNextPage$ = createEffect(() => this.action$.pipe(
    ofType(SearchVideosNextPage),
    withLatestFrom(this.store$.pipe(select(selectNextPageToken))),
    map(([action, nextPage]) => SearchVideos({limit: action.limit, nextPage}))
  ));

  constructor(
    private action$: Actions,
    private service: YoutubeService,
    private store$: Store<AppState>,
  ) {}
}
