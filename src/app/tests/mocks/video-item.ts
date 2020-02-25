import { Component, Input } from '@angular/core';
import { SearchListItem } from '../../modules/search/types';

@Component({
  selector: 'app-video-item',
  template: '[app-video-item]',
})
export class MockVideoItemComponent {
  @Input() item: SearchListItem;
  @Input() inFavourites = false;
}
