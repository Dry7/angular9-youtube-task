import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { SearchListItem } from '../../types';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { ListRange } from '@angular/cdk/collections';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoListComponent implements AfterViewInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();

  @Input() public readonly items: SearchListItem[] = [];

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  ngAfterViewInit(): void {
    this.viewport.renderedRangeStream.pipe(
      takeUntil(this.unsubscribe$),
      filter((change: ListRange) => change.end === this.viewport.getDataLength()),
      distinctUntilChanged(),
    ).subscribe(change => {
      console.log(change);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
