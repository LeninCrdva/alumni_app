import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titulo } from '../Models/titulo';

@Injectable({
  providedIn: 'root'
})
export class TituloService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/titulos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getTitulos(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(this.urlEndPoint);
  }

  createTitulo(titulo: Titulo): Observable<Titulo> {
    return this.http.post<Titulo>(this.urlEndPoint, titulo, { headers: this.httpHeaders })
  }

  getTituloById(id: any): Observable<Titulo> {
    return this.http.get<Titulo>(`${this.urlEndPoint}/${id}`)
  }
}
