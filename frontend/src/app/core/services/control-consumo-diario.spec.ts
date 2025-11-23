import { TestBed } from '@angular/core/testing';

import { ControlConsumoDiario } from './control-consumo-diario';

describe('ControlConsumoDiario', () => {
  let service: ControlConsumoDiario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlConsumoDiario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
