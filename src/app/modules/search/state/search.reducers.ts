import * as searchActions from './search.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { SearchState } from './index';

const LIMIT = 10;

export const initialState: SearchState = {
  items: [],
  favourites: {
    selected: [],
    items: {},
  },
  loading: true,
  navigation: {
    nextPage: null,
    query: null,
    limit: LIMIT,
  },
};

const searchReducer = createReducer(
  initialState,
  on(searchActions.UpdateQuery, (state, { query }) => ({
    ...state,
    items: [],
    navigation: {
      ...state.navigation,
      nextPage: null,
      query
    }
  })),
  on(searchActions.SearchVideosLoading, state => ({...state, loading: true})),
  on(searchActions.SearchVideosComplete, (state, { response }) => ({
    ...state,
    loading: false,
    items: [
      ...state.items,
      ...response.items,
    ],
    navigation: {
      ...state.navigation,
      nextPage: response.nextPageToken
    },
  })),
  on(searchActions.SearchVideosCompleteLastPage, state => ({...state, loading: false})),
  on(searchActions.SearchVideosFailed, state => ({...state, loading: false})),
  on(searchActions.ToggleFavourites, (state, { item }) => ({
    ...state,
    favourites: state.favourites.selected.includes(item.id.videoId) ? {
      selected: state.favourites.selected.filter(id => id !== item.id.videoId),
      items: Object.entries(state.favourites.items).reduce(
        (object, [key, value]) => (key === item.id.videoId ? object : {...object, [key]: value}),
        {}
      ),
    } : {
      selected: state.favourites.selected.concat(item.id.videoId),
      items: {...state.favourites.items, [item.id.videoId]: item},
    },
  })),
);

export function reducer(state: SearchState | undefined, action: Action) {
  return searchReducer(state, action);
}
