import { TestBed } from '@angular/core/testing';

import { ServicesAuthService } from './services-auth.service';

describe('ServicesAuthService', () => {
  let service: ServicesAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
