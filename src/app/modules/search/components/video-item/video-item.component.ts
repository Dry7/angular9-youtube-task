import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchListItem } from '../../types';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent {
  @Input() item: SearchListItem;
  @Input() inFavourites = false;
  @Output() public readonly favouritesToggled = new EventEmitter<SearchListItem>();

  toggleFavourites(item: SearchListItem): void {
    this.favouritesToggled.emit(item);
  }

  link(videoId: string): string {
    return 'https://www.youtube.com/watch?v=' + videoId;
  }
}
