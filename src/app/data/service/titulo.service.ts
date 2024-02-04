import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titulo } from '../model/titulo';

@Injectable({
  providedIn: 'root'
})
export class TituloService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/titulos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getTitulos(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(this.urlEndPoint);
  }

  createTitulo(titulo: Titulo): Observable<Titulo> {
    return this.http.post<Titulo>(this.urlEndPoint, titulo, { headers: this.httpHeaders });
  }

  getTituloById(id: number): Observable<Titulo> {
    return this.http.get<Titulo>(`${this.urlEndPoint}/${id}`);
  }

  updateTitulo(id: number, titulo: Titulo): Observable<Titulo> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.put<Titulo>(url, titulo, { headers: this.httpHeaders });
  }

  deleteTitulo(id: number): Observable<void> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.delete<void>(url, { headers: this.httpHeaders });
  }
}
