import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresario } from '../Models/empresario';

@Injectable({
  providedIn: 'root'
})
export class EmpresarioService {

  urlEndPoint = MAIN_ROUTE + '/empresarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getEmpresarios(): Observable<Empresario[]> {
    return this.http.get<Empresario[]>(this.urlEndPoint);
  }

  createEmpresario(businessMan: Empresario): Observable<Empresario> {
    return this.http.post<Empresario>(this.urlEndPoint, businessMan, { headers: this.httpHeaders })
  }

  getEmpresarioById(id: any): Observable<Empresario> {
    return this.http.get<Empresario>(`${this.urlEndPoint}/${id}`)
  }
}
