import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../model/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/empresas';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.urlEndPoint);
  }

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.urlEndPoint, empresa, { headers: this.httpHeaders })
  }

  getEmpresaById(id: any): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.urlEndPoint}/${id}`)
  }

}
