import { TestBed } from '@angular/core/testing';

import { MonitoreoFisicoquimico } from './monitoreo-fisicoquimico';

describe('MonitoreoFisicoquimico', () => {
  let service: MonitoreoFisicoquimico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoreoFisicoquimico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
