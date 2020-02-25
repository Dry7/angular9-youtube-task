import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Thumbnail } from '../../types';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailComponent {
  @Input() thumbnail: Thumbnail;
}
