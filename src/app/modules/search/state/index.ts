import { SearchListItem } from '../types';
import { createSelector } from '@ngrx/store';

interface Navigation {
  nextPage: string | null;
  query: string;
  limit: number;
}

export interface SearchState {
  items: SearchListItem[];
  favourites: string[];
  loading: boolean;
  navigation: Navigation;
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

export const selectLoading = createSelector(
  selectSearch,
  (state: SearchState) => state.loading,
);

export const selectNavigation = createSelector(
  selectSearch,
  (state: SearchState) => state.navigation,
);

export const selectQuery = createSelector(
  selectNavigation,
  (state: Navigation) => state.query,
);
