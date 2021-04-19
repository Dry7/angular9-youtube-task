import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchFilterComponent } from './search-filter.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeDetectionStrategy } from '@angular/core';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFilterComponent ],
      imports: [ ReactiveFormsModule, MatInputModule, NoopAnimationsModule, ],
    })
    .overrideComponent(SearchFilterComponent, {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.form = new FormGroup({
      query: new FormControl(''),
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
