import { SearchListItem } from '../types';
import { createSelector } from '@ngrx/store';

export interface SearchState {
  items: SearchListItem[];
  favourites: string[];
  nextPage: string | null;
  loading: boolean;
}

export interface AppState {
  search: SearchState;
}

export const selectSearch = (state: AppState) => state.search;

export const selectVideos = createSelector(
  selectSearch,
  (state: SearchState) => state.items,
);

export const selectFavourites = createSelector(
  selectSearch,
  (state: SearchState) => state.favourites,
);

export const selectNextPageToken = createSelector(
  selectSearch,
  (state: SearchState) => state.nextPage,
);
