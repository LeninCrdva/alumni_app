import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Referencias_personales } from '../model/referencia_personal';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaPersonalService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/referencias-personales';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getReferenciasPersonales(): Observable<Referencias_personales[]> {
    return this.http.get<Referencias_personales[]>(this.urlEndPoint);
  }

  createReferenciasPersonales(referencias_personales: Referencias_personales): Observable<Referencias_personales> {
    return this.http.post<Referencias_personales>(`${this.urlEndPoint}/create`, referencias_personales, { headers: this.httpHeaders })
  }

  getReferenciasPersonalesById(id: any): Observable<Referencias_personales> {
    return this.http.get<Referencias_personales>(`${this.urlEndPoint}/${id}`)
  }
  
  updateReferenciasPersonales(id: number, referencias_personales: Referencias_personales): Observable<any> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.put<Referencias_personales>(url, referencias_personales);
  }

  deleteReferenciasPersonales(id: any): Observable<void> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.delete<void>(url, { headers: this.httpHeaders });
  }
}
