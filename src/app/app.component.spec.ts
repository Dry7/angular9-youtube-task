import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MatIconModule, MatToolbarModule, MatSidenavModule, NoopAnimationsModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should not show sidenav', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('ng-reflect-opened="false"');
  });

  it('should show sidenav after click by icon', () => {
    fixture.detectChanges();

    fixture.nativeElement.querySelector('button').click();

    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('ng-reflect-opened="true"');
  });
});
