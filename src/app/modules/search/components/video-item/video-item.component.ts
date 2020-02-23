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
  @Output() public readonly favouritesToggled = new EventEmitter<string>();

  addToFavourites(videoId: string): void {
    this.favouritesToggled.emit(videoId);
  }
}
