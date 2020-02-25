import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { VideoItemComponent } from './video-item.component';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ThumbnailComponent } from '../../../shared/components/thumbnail/thumbnail.component';
import { MatButtonModule } from '@angular/material/button';

describe('VideoItemComponent', () => {
  let component: VideoItemComponent;
  let fixture: ComponentFixture<VideoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoItemComponent, ThumbnailComponent ],
      imports: [ MatCardModule, MatIconModule, MatButtonModule ]
    })
    .overrideComponent(VideoItemComponent, {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoItemComponent);
    component = fixture.componentInstance;
    component.item = {
      kind: 'youtube#searchResult',
      etag: 'Fznwjl6JEQdo1MGvHOGaz_YanRU/h_F_S9dulR_o1e7qzVvxlDjf9qE',
      id: {
        kind: 'youtube#video',
        videoId: 'TRIaCrDxb2M',
      },
      snippet: {
        publishedAt: '2020-02-23T03:21:31.000Z',
        channelId: 'UCWwCM3cvQjiAecvkph7EyCQ',
        title: 'Рейнджерс - Сан-Хосе: 23 февраля 2020, Обзор матча...',
        description: 'San Jose Sharks vs New York Rangers НХЛ 23 февраля 2020',
        thumbnails: {
          default: { url: 'https://i.ytimg.com/vi/TRIaCrDxb2M/default.jpg', width: 120, height: 90 },
          medium: { url: 'https://i.ytimg.com/vi/TRIaCrDxb2M/mqdefault.jpg', width: 320, height: 180 },
          high: { url: 'https://i.ytimg.com/vi/TRIaCrDxb2M/hqdefault.jpg', width: 480, height: 360 },
        },
        channelTitle: 'vlad pergler',
        liveBroadcastContent: 'none',
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    expect(fixture.nativeElement.textContent).toContain('Рейнджерс - Сан-Хосе: 23 февраля 2020, Обзор матча...');
  });

  it('should show thumbnail', () => {
    expect(fixture.nativeElement.innerHTML)
      .toContain('<img src="https://i.ytimg.com/vi/TRIaCrDxb2M/mqdefault.jpg" width="320" height="180">');
  });

  it('should show link', () => {
    expect(fixture.nativeElement.innerHTML)
      .toContain('<a target="_blank" href="https://www.youtube.com/watch?v=TRIaCrDxb2M">');
  });

  it('should show favourites', () => {
    component.inFavourites = false;

    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML)
      .toContain('favorite');
  });

  it('should show favourites hovered if checked', () => {
    component.inFavourites = true;

    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML)
      .toContain('ng-reflect-color="primary"');
  });

  it('should not emit when no click', () => {
    spyOn(component.favouritesToggled, 'emit');

    fixture.detectChanges();

    expect(component.favouritesToggled.emit).toHaveBeenCalledTimes(0);
  });

  it('should emit when click on favourites', () => {
    spyOn(component.favouritesToggled, 'emit');

    fixture.nativeElement.querySelector('button').click();

    fixture.detectChanges();

    expect(component.favouritesToggled.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit twice when click on favourites twice', () => {
    spyOn(component.favouritesToggled, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    button.click();

    fixture.detectChanges();

    expect(component.favouritesToggled.emit).toHaveBeenCalledTimes(2);
  });
});
