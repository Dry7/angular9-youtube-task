import { Component, Input, OnInit } from '@angular/core';
import { SearchListItem } from '../../types';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent {
  @Input() public readonly items: SearchListItem[] = [];

  trackBy(index: number, item: SearchListItem) {
    return item.id;
  }
}
