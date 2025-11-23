import { TestBed } from '@angular/core/testing';

import { Quimico } from './quimico';

describe('Quimico', () => {
  let service: Quimico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Quimico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
