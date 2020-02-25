import { Component, Input } from '@angular/core';
import { SearchListItem } from '../../modules/search/types';

@Component({
  selector: 'app-video-list',
  template: '[app-video-list items="{{ items | json }}" favourites="{{ favourites | json }}" loading="{{ loading }}"]',
})
export class MockVideoListComponent {
  @Input() public items: SearchListItem[] = [];
  @Input() public favourites: string[] = [];
  @Input() public loading = false;
}
