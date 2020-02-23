import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './pages/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ActionReducer, StoreModule } from '@ngrx/store';
import * as fromState from './state/search.reducers';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './state/search.effects';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { localStorageSync } from 'ngrx-store-localstorage';

function localStorage(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [{navigation: ['query']}, 'favourites'],
    rehydrate: true,
    removeOnUndefined: true,
  })(reducer);
}

@NgModule({
  declarations: [SearchComponent, VideoItemComponent, VideoListComponent, SearchFilterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ScrollingModule,
    StoreModule.forFeature('search', fromState.reducer, {initialState: fromState.initialState, metaReducers: [localStorage]}),
    EffectsModule.forFeature([SearchEffects]),
    SharedModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class SearchModule { }
