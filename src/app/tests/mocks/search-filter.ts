import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  template: '[app-search-filter]',
})
export class MockSearchFilterComponent {
  @Input() readonly form: FormGroup;
}
