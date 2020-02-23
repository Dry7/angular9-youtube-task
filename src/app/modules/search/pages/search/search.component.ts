import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchListItem } from '../../types';
import { select, Store } from '@ngrx/store';
import { ToggleFavourites, SearchVideos, SearchVideosNextPage } from '../../state/search.actions';
import { AppState, selectFavourites, selectVideos } from '../../state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private readonly LIMIT = 50;
  public search$ = new Observable<SearchListItem[]>();
  public favourites$ = new Observable<string[]>();

  constructor(private readonly store$: Store<AppState>) { }

  ngOnInit(): void {
    this.store$.dispatch(SearchVideos({nextPage: null, limit: this.LIMIT}));
    this.search$ = this.store$.pipe(select(selectVideos));
    this.favourites$ = this.store$.pipe(select(selectFavourites));
  }

  next(): void {
    this.store$.dispatch(SearchVideosNextPage({limit: this.LIMIT}));
  }

  addToFavourites(videoId: string): void {
    this.store$.dispatch(ToggleFavourites({videoId}));
  }
}
