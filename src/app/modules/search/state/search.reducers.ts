import * as searchActions from './search.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { SearchState } from './index';

export const initialState: SearchState = {
  items: [],
  favourites: [],
  nextPage: null,
  loading: true,
};

const searchReducer = createReducer(
  initialState,
  on(searchActions.SearchVideos, state => ({...state, loading: true})),
  on(searchActions.SearchVideosComplete, (state, { response }) => ({
    ...state,
    nextPage: response.nextPageToken,
    loading: false,
    items: [
      ...state.items,
      ...response.items,
    ],
  })),
  on(searchActions.SearchVideosFailed, state => ({...state, loading: false})),
  on(searchActions.ToggleFavourites, (state, { videoId }) => ({
    ...state,
    favourites: state.favourites.includes(videoId) ? state.favourites.filter(id => id !== videoId) : state.favourites.concat(videoId)
  }))
);

export function reducer(state: SearchState | undefined, action: Action) {
  return searchReducer(state, action);
}
