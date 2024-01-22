import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periodo } from '../Models/periodo';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/periodos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getPeriodos(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(this.urlEndPoint);
  }

  createPeriodo(periodo: Periodo): Observable<Periodo> {
    return this.http.post<Periodo>(this.urlEndPoint, periodo, { headers: this.httpHeaders })
  }

  getPeriodoById(id: any): Observable<Periodo> {
    return this.http.get<Periodo>(`${this.urlEndPoint}/${id}`)
  }}
