import { TestBed } from '@angular/core/testing';

import { ServerdataService } from './serverdata.service';

describe('ServerdataService', () => {
  let service: ServerdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
