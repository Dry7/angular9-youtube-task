import { createAction, props } from '@ngrx/store';
import { SearchListResponse } from '../types';

export const SearchVideos = createAction('[Search] Loading videos', props<{limit: number; nextPage: string | null}>());
export const SearchVideosComplete = createAction('[Search] Loading videos complete', props<{response: SearchListResponse}>());
export const SearchVideosFailed = createAction('[Search] Loading videos failed', props<{error: Error}>());
export const SearchVideosNextPage = createAction('[Search] Loading videos next page', props<{limit: number | null}>());

