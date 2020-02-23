import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, selectFavouritesItems, selectSelectedFavourites } from '../../state';
import { BaseComponent } from '../../../shared/components/BaseComponent';
import { Observable } from 'rxjs';
import { SearchListItem } from '../../types';
import { ToggleFavourites } from '../../state/search.actions';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
})
export class FavouritesComponent extends BaseComponent implements OnInit {
  public items$ = new Observable<SearchListItem[]>();
  public favourites$ = new Observable<string[]>();

  constructor(private readonly store$: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.items$ = this.store$.pipe(select(selectFavouritesItems));
    this.favourites$ = this.store$.pipe(select(selectSelectedFavourites));
  }

  toggleFavourites(item: SearchListItem): void {
    this.store$.dispatch(ToggleFavourites({item}));
  }
}
