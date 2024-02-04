import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Capacitacion } from '../model/capacitacion';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/capacitacion';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getCapacitaciones(): Observable<Capacitacion[]> {
    return this.http.get<Capacitacion[]>(`${this.urlEndPoint}/list`);
  }

  createCapacitacion(capacitacion: Capacitacion): Observable<Capacitacion> {
    return this.http.post<Capacitacion>(`${this.urlEndPoint}/save-cap`, capacitacion, { headers: this.httpHeaders })
  }

  getCapacitacionById(id: any): Observable<Capacitacion> {
    return this.http.get<Capacitacion>(`${this.urlEndPoint}/find-cap/${id}`)
  }

  updateCapacitacion(id: any, Capacitacion: Capacitacion): Observable<Capacitacion> {
    const url = `${this.urlEndPoint}/update-cap/${id}`;
    return this.http.put<Capacitacion>(url, Capacitacion, { headers: this.httpHeaders });
  }

  deleteCapacitacion(id: any): Observable<void> {
    const url = `${this.urlEndPoint}/delete-cap/${id}`;
    return this.http.delete<void>(url, { headers: this.httpHeaders });
  }
}