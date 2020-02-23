import { Component, Input } from '@angular/core';
import { Thumbnail } from '../../types';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
})
export class ThumbnailComponent {
  @Input() thumbnail: Thumbnail;
}
