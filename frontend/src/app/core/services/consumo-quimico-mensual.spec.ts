import { TestBed } from '@angular/core/testing';

import { ConsumoQuimicoMensual } from './consumo-quimico-mensual';

describe('ConsumoQuimicoMensual', () => {
  let service: ConsumoQuimicoMensual;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumoQuimicoMensual);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
