import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Capacitacion } from '../Models/capacitacion';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/capacitacion';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getCapacitaciones(): Observable<Capacitacion[]> {
    return this.http.get<Capacitacion[]>(this.urlEndPoint);
  }

  createCapacitacion(capacitacion: Capacitacion): Observable<Capacitacion> {
    return this.http.post<Capacitacion>(this.urlEndPoint, capacitacion, { headers: this.httpHeaders })
  }

  getCapacitacionById(id: any): Observable<Capacitacion> {
    return this.http.get<Capacitacion>(`${this.urlEndPoint}/${id}`)
  }
}
