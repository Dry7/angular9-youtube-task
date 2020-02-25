import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { VideoListComponent } from './video-list.component';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import videos from '../../../../tests/fixtures/videos';
import { MockVideoItemComponent } from '../../../../tests/mocks/video-item';
import { MatProgressSpinnerComponent } from '../../../../tests/mocks/spinner';
import { ChangeDetectionStrategy } from '@angular/core';

describe('VideoListComponent', () => {
  let component: VideoListComponent;
  let fixture: ComponentFixture<VideoListComponent>;
  const viewport = {
    renderedRangeStream: null,
    getDataLength: jest.fn(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoListComponent, MockVideoItemComponent, MatProgressSpinnerComponent ],
      imports: [ ScrollingModule ],
      providers: [
        { provide: CdkVirtualScrollViewport, useValue: viewport }
      ]
    })
    .overrideComponent(VideoListComponent, {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner on loading', () => {
    component.loading = true;

    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('[mat-progress-spinner]');
  });

  it('should show items', fakeAsync(() => {
    component.items = videos;

    fixture.autoDetectChanges();

    tick(500);

    expect(fixture.nativeElement.innerHTML).toContain('[app-video-item]');
    expect(fixture.nativeElement.innerHTML).toContain('<div class="cdk-virtual-scroll-spacer" style="height: 783px;">');
  }));

  it('should pass in favourites', fakeAsync(() => {
    component.items = videos;
    component.favourites = [videos[0].id.videoId];

    fixture.autoDetectChanges();

    tick(500);

    expect(fixture.nativeElement.innerHTML).toContain('<app-video-item class="video-item" ng-reflect-item="[object Object]"'
      + ' ng-reflect-in-favourites="true">[app-video-item]</app-video-item>');
  }));

  it('should emit toggle favourite event', () => {
    spyOn(component.favouritesToggled, 'emit');

    component.items = videos;
    component.toggleFavourites(videos[0]);

    expect(component.favouritesToggled.emit).toHaveBeenNthCalledWith(1, videos[0]);
  });

  it('should emit loading event when scrolled to bottom', fakeAsync(() => {
    spyOn(component.next, 'emit');

    component.items = [videos[0]];

    fixture.detectChanges();

    component.viewport.scrollToIndex(4);

    tick(500);

    expect(component.next.emit).toHaveBeenCalledTimes(1);
  }));
});
