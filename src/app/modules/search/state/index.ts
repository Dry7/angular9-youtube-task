import { SearchListItem } from '../types';
import { createSelector } from '@ngrx/store';

export interface SearchState {
  items: SearchListItem[];
  favourites: string[];
  loading: boolean;
  navigation: {
    nextPage: string | null;
    query: string;
    limit: number;
  };
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

export const selectNavigation = createSelector(
  selectSearch,
  (state: SearchState) => state.navigation,
);

export const selectNextPageToken = createSelector(
  selectSearch,
  (state: SearchState) => state.navigation.nextPage,
);

export const selectQuery = createSelector(
  selectSearch,
  (state: SearchState) => state.navigation.query,
);
