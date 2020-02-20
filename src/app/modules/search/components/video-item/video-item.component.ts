import { Component, Input, OnInit } from '@angular/core';
import { SearchListItem } from '../../types';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent {
  @Input() item: SearchListItem;
}
