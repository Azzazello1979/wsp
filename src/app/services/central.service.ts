import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CentralService {
  busy: boolean = false;
  busyChanged = new BehaviorSubject<boolean>(this.busy);

  busyON() {
    this.busy ? null : (this.busy = true);
    this.busyChanged.next(this.busy);
    console.log('busy state:', this.busy);
  }
  busyOFF() {
    this.busy ? (this.busy = false) : null;
    this.busyChanged.next(this.busy);
    console.log('busy state:', this.busy);
  }
  busyState() {
    return this.busyChanged.asObservable();
  }
}
