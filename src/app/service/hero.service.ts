import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private _http: HttpClient) {}

  addHero(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/heroes', data);
  }

  updateHero(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/heroes/${id}`, data);
  }

  getHeroList(): Observable<any> {
    return this._http.get('http://localhost:3000/heroes');
  }

  deleteHero(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/heroes/${id}`);
  }
}
