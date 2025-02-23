import { Hero } from '../models/hero';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesMindataService {
  private apiUrl = 'assets/mock-api-heroes-mindata.json';
  private http = inject(HttpClient);
  private heroesCache: Hero[] = [];

  getHeroes(): Observable<Hero[]> {
    if (this.heroesCache.length > 0) {
      return of(this.heroesCache);
    } else {
      return this.http.get<{ superheroes: Hero[] }>(this.apiUrl).pipe(
        map((response) => response.superheroes),
        tap((heroes) => (this.heroesCache = heroes))
      );
    }
  }

  getHero(id: number): Observable<Hero | undefined> {
    return this.getHeroes().pipe(
      map((heroes) => heroes.find((hero) => hero.id === id))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    const newHero = { ...hero, id: this.heroesCache.length + 1 };
    this.heroesCache.push(newHero);
    return of(newHero);
  }

  updateHero(hero: Hero): Observable<Hero | null> {
    const index = this.heroesCache.findIndex((h) => h.id === hero.id);
    if (index !== -1) {
      this.heroesCache[index] = hero;
      return of(hero);
    }
    return of(null);
  }

  deleteHero(id: number): Observable<boolean> {
    const index = this.heroesCache.findIndex((hero) => hero.id === id);
    if (index !== -1) {
      this.heroesCache.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    return this.getHeroes().pipe(
      map((heroes) =>
        heroes.filter((hero) =>
          hero.name.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }
}
