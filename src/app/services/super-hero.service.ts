import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalVar } from '../global';
import { SuperHero } from '../models/super-hero.model';

const baseApiUrl = globalVar.BASE_API_URL;

@Injectable({
  providedIn: 'root'
})
export class SuperHeroService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<SuperHero[]> {
    return this.http.get<SuperHero[]>(`${baseApiUrl}/api/SuperHero`);
  }

  get(id: any): Observable<SuperHero> {
    return this.http.get<SuperHero>(`${baseApiUrl}/api/SuperHero/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseApiUrl}/api/SuperHero`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseApiUrl}/api/SuperHero/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseApiUrl}/api/SuperHero/${id}`);
  }
}
