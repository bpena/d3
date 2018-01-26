import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GraphForceService {
  private on: boolean;
  private statusForceObservable: BehaviorSubject<boolean>;

  constructor() {
    this.on = true;
    this.statusForceObservable = new BehaviorSubject(this.on);
  }

  switchForce() {
    this.on = !this.on;
    this.statusForceObservable.next(this.on);
  }

  statusForce(): BehaviorSubject<boolean> {
    return this.statusForceObservable;
  }
}
