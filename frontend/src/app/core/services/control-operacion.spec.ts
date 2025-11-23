import { TestBed } from '@angular/core/testing';

import { ControlOperacion } from './control-operacion';

describe('ControlOperacion', () => {
  let service: ControlOperacion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlOperacion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
