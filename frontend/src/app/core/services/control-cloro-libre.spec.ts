import { TestBed } from '@angular/core/testing';

import { ControlCloroLibre } from './control-cloro-libre';

describe('ControlCloroLibre', () => {
  let service: ControlCloroLibre;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlCloroLibre);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
