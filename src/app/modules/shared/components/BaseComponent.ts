import { Component, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base-item',
  template: ``
})
export class BaseComponent implements OnDestroy {
  protected readonly unsubscribe$ = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
