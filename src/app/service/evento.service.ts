import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../Models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/eventos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.urlEndPoint);
  }

  createEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.urlEndPoint, evento, { headers: this.httpHeaders })
  }

  getEventoById(id: any): Observable<Evento> {
    return this.http.get<Evento>(`${this.urlEndPoint}/${id}`)
  }
}
