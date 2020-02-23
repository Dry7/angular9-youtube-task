import { Component, Input, OnInit } from '@angular/core';
import { Thumbnail } from '../../types';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent {
  @Input() thumbnail: Thumbnail;
}
