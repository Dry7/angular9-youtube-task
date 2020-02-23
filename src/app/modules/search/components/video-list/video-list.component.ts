import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SearchListItem } from '../../types';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
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
  @Input() public readonly loading: boolean = false;
  @Output() public readonly next = new EventEmitter<void>();
  @Output() public readonly favouritesToggled = new EventEmitter<SearchListItem>();

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  ngAfterViewInit(): void {
    this.viewport.renderedRangeStream.pipe(
      takeUntil(this.unsubscribe$),
      map((change: ListRange) => change.end),
      filter((end: number) => end === this.viewport.getDataLength()),
      distinctUntilChanged(),
    ).subscribe((end) => {
      this.next.emit();
    });
  }

  toggleFavourites(item: SearchListItem): void {
    this.favouritesToggled.emit(item);
  }

  isInFavourites(item: SearchListItem): boolean {
    return this.favourites.includes(item.id.videoId);
  }
}
