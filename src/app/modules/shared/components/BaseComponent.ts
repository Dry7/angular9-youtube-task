import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseComponent implements OnDestroy {
  protected readonly unsubscribe$ = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
