import { createAction, props } from '@ngrx/store';
import { SearchListItem, SearchListResponse } from '../types';

export const SearchVideos = createAction('[Search] Start loading videos');
export const SearchVideosLoading = createAction(
  '[Search] Loading videos',
  props<{query: string | null, limit: number; nextPage?: string | null}>()
);
export const SearchVideosComplete = createAction('[Search] Loading videos complete', props<{response: SearchListResponse}>());
export const SearchVideosCompleteLastPage = createAction('[Search] Loading videos complete last page');
export const SearchVideosFailed = createAction('[Search] Loading videos failed', props<{error: Error}>());
export const SearchVideosNextPage = createAction('[Search] Loading videos next page');

export const ToggleFavourites = createAction('[Search] Toggle favourites', props<{item: SearchListItem}>());
export const UpdateQuery = createAction('[Search] Update query', props<{query: string | null}>());
