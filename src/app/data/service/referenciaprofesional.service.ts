import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Referencias_profesionales } from '../model/referencia_profesional';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaProfesionalService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/referencias-profesionales';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getReferenciasProfesionales(): Observable<Referencias_profesionales[]> {
    return this.http.get<Referencias_profesionales[]>(this.urlEndPoint);
  }

  createReferenciasProfesionales(referencias_profesionales: Referencias_profesionales): Observable<Referencias_profesionales> {
    return this.http.post<Referencias_profesionales>(this.urlEndPoint, referencias_profesionales, { headers: this.httpHeaders })
  }

  getReferenciasProfesionalesById(id: any): Observable<Referencias_profesionales> {
    return this.http.get<Referencias_profesionales>(`${this.urlEndPoint}/${id}`)
  }

  updateReferenciasProfesionales(id: number, referencias_profesionales: Referencias_profesionales): Observable<Referencias_profesionales> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.put<Referencias_profesionales>(url, referencias_profesionales);
  }

  deleteReferenciasProfesionales(id: any): Observable<void> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.delete<void>(url, { headers: this.httpHeaders });
  }
}
