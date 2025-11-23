import { TestBed } from '@angular/core/testing';

import { ProduccionFiltro } from './produccion-filtro';

describe('ProduccionFiltro', () => {
  let service: ProduccionFiltro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduccionFiltro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
