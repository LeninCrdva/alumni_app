import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../model/ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  
  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/ciudades';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.urlEndPoint);
  }

  createCiudad(city: Ciudad): Observable<Ciudad> {
    return this.http.post<Ciudad>(this.urlEndPoint, city, { headers: this.httpHeaders })
  }

  getCiudadById(id: any): Observable<Ciudad> {
    return this.http.get<Ciudad>(`${this.urlEndPoint}/${id}`)
  }
}
