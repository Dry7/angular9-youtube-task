import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchListItem } from '../../types';
import { select, Store } from '@ngrx/store';
import { ToggleFavourites, SearchVideosLoading, SearchVideosNextPage, UpdateQuery, SearchVideos } from '../../state/search.actions';
import { AppState, selectFavourites, selectQuery, selectVideos } from '../../state';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../../shared/components/BaseComponent';

const DEBOUNCE = 300;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseComponent implements OnInit {
  public search$ = new Observable<SearchListItem[]>();
  public favourites$ = new Observable<string[]>();
  public readonly form = new FormGroup({
    query: new FormControl(''),
  });

  constructor(private readonly store$: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.search$ = this.store$.pipe(select(selectVideos));
    this.favourites$ = this.store$.pipe(select(selectFavourites));
    this.form.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        map(values => values.query),
        distinctUntilChanged(),
        debounceTime(DEBOUNCE),
      )
      .subscribe((query: string) => {
        this.store$.dispatch(UpdateQuery({query}));
      });
    this.store$.pipe(select(selectQuery)).subscribe((query: string) => this.form.setValue({ query }));
  }

  search(): void {
    this.store$.dispatch(SearchVideos());
  }

  next(): void {
    this.store$.dispatch(SearchVideosNextPage());
  }

  addToFavourites(videoId: string): void {
    this.store$.dispatch(ToggleFavourites({videoId}));
  }
}
