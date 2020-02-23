import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SearchListItem } from '../../types';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { ListRange } from '@angular/cdk/collections';
import { BaseComponent } from '../../../shared/components/BaseComponent';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoListComponent extends BaseComponent implements AfterViewInit {
  @Input() public readonly items: SearchListItem[] = [];
  @Input() public readonly favourites: string[] = [];
  @Output() public readonly next = new EventEmitter<void>();
  @Output() public readonly favouritesToggled = new EventEmitter<string>();

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  ngAfterViewInit(): void {
    this.viewport.renderedRangeStream.pipe(
      takeUntil(this.unsubscribe$),
      filter((change: ListRange) => change.end === this.viewport.getDataLength()),
      distinctUntilChanged(),
    ).subscribe(() => this.next.emit());
  }

  addToFavourites(videoId: string): void {
    this.favouritesToggled.emit(videoId);
  }

  isInFavourites(item: SearchListItem): boolean {
    return this.favourites.includes(item.id.videoId);
  }
}
