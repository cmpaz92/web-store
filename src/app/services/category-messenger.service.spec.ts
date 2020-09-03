import {TestBed} from '@angular/core/testing';

import {CategoryMessengerService} from './category-messenger.service';

describe('CategoryMessengerService', () => {
  let service: CategoryMessengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryMessengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
