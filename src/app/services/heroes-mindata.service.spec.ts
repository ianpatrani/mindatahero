import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroesMindataService } from './heroes-mindata.service';
import { Hero } from '../models/hero';

describe('HeroesMindataService', () => {
  let service: HeroesMindataService;
  let httpTestingController: HttpTestingController;
  const mockHeroes: Hero[] = [
    {
      id: 1,
      name: 'Superman',
      description: 'Hombre de Acero',
      image: 'superman.jpg',
    },
    {
      id: 2,
      name: 'Batman',
      description: 'Caballero Oscuro',
      image: 'batman.jpg',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesMindataService],
    });
    service = TestBed.inject(HeroesMindataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get heroes from API when cache is empty', () => {
    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpTestingController.expectOne(
      'assets/mock-api-heroes-mindata.json'
    );
    expect(req.request.method).toEqual('GET');
    req.flush({ superheroes: mockHeroes });
  });

  it('should get heroes from cache when available', () => {
    service['heroesCache'] = mockHeroes;
    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });
  });

  it('should get a hero by id', () => {
    service['heroesCache'] = mockHeroes;
    service.getHero(2).subscribe((hero) => {
      expect(hero).toEqual(mockHeroes[1]);
    });
  });

  it('should add a hero', () => {
    service['heroesCache'] = mockHeroes;
    const newHero: Hero = {
      id: 3,
      name: 'Deadpool',
      description: 'Deadpool',
      image: 'deadpool.jpg',
    };
    service.addHero(newHero).subscribe((hero) => {
      expect(hero).toEqual(newHero);
      expect(service['heroesCache']).toContain(newHero);
    });
  });

  it('should update a hero', () => {
    service['heroesCache'] = mockHeroes;
    const updatedHero: Hero = {
      id: 1,
      name: 'Superman Updated',
      description: 'Updated Man of Steel',
      image: 'superman-updated.jpg',
    };
    service.updateHero(updatedHero).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
      expect(service['heroesCache'][0]).toEqual(updatedHero);
    });
  });

  it('should delete a hero', () => {
    service['heroesCache'] = mockHeroes;
    service.deleteHero(1).subscribe((result) => {
      expect(result).toBe(true);
    });
  });

  it('should search heroes by term', () => {
    service['heroesCache'] = mockHeroes;
    service.searchHeroes('Superman Updated').subscribe((heroes) => {
      if (heroes.length > 0) {
        expect(heroes[0].name).toBe('Superman Updated');
      }
    });
  });
});
