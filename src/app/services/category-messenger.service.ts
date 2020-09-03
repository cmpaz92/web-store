import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})

export class CategoryMessengerService {
  private subject = new Subject<any>();

  sendFilter(message: string) {
    this.subject.next(message);
  }

  clearFilter() {
    this.subject.next();
  }

  getFilter(): Observable<any> {
    return this.subject.asObservable();
  }
}
