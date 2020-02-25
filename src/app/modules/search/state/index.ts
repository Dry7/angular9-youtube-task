import { SearchListItem } from '../types';
import { createSelector } from '@ngrx/store';

interface Navigation {
  nextPage: string | null;
  query: string;
  limit: number;
}

interface Favourites {
  selected: string[];
  items: {[key: string]: SearchListItem};
}

export interface SearchState {
  items: SearchListItem[];
  favourites: Favourites;
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

export const selectSelectedFavourites = createSelector(
  selectFavourites,
  (state: Favourites) => state.selected,
);

export const selectFavouritesItems = createSelector(
  selectFavourites,
  (state: Favourites) => state.selected.map(selected => state.items[selected]),
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
