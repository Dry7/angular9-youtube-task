import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchListItem } from '../../types';
import { select, Store } from '@ngrx/store';
import { SearchVideos, SearchVideosNextPage } from '../../state/search.actions';
import { AppState, selectVideos } from '../../state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private readonly LIMIT = 50;
  public search$ = new Observable<SearchListItem[]>();

  constructor(private readonly store$: Store<AppState>) { }

  ngOnInit(): void {
    this.store$.dispatch(SearchVideos({nextPage: null, limit: this.LIMIT}));
    this.search$ = this.store$.pipe(select(selectVideos));
  }

  next(): void {
    this.store$.dispatch(SearchVideosNextPage({limit: this.LIMIT}));
  }
}
