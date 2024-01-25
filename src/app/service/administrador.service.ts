import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador } from '../data/model/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/administradores';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getAdministradores(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(this.urlEndPoint);
  }

  createAdministrador(administrador: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(this.urlEndPoint, administrador, { headers: this.httpHeaders })
  }

  getAdministradorById(id: any): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.urlEndPoint}/${id}`)
  }
}
