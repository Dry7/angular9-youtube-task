import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailComponent } from './thumbnail.component';
import { ChangeDetectionStrategy } from '@angular/core';

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailComponent ]
    })
    .overrideComponent(ThumbnailComponent, {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create without thumbnail', () => {
    expect(component).toBeTruthy();
  });

  it('should create with thumbnail', () => {
    component.thumbnail = {url: 'http://yandex.ru/logo.png', width: 200, height: 100};
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toContain('<img src="http://yandex.ru/logo.png" width="200" height="100">');
  });
});
