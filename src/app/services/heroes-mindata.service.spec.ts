/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeroesMindataService } from './heroes-mindata.service';

describe('Service: HeroesMindata', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesMindataService]
    });
  });

  it('should ...', inject([HeroesMindataService], (service: HeroesMindataService) => {
    expect(service).toBeTruthy();
  }));
});
