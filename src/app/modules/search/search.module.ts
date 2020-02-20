import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './pages/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { VideoListComponent } from './components/video-list/video-list.component';

@NgModule({
  declarations: [SearchComponent, VideoItemComponent, VideoListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class SearchModule { }
