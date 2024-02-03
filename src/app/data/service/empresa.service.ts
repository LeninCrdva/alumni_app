import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../model/empresa';
import { Empresario } from '../model/empresario';

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

  getEmpresasbyUser(nombre:String): Observable<Empresa[]> {
    const url = `${this.urlEndPoint}/by-usuario/${nombre}`;
    return this.http.get<Empresa[]>(url);
  }

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.urlEndPoint, empresa, { headers: this.httpHeaders })
  }

  getEmpresaById(id: any): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.urlEndPoint}/${id}`)
  }

  updateEmpresa(id: number, empresa: Empresa): Observable<Empresa> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.put<Empresa>(url, empresa, { headers: this.httpHeaders });
  }

  getEmpresarioByUsuarioId(id: any): Observable<Empresario> {
    return this.http.get<Empresario>(`${this.urlEndPoint}/usuario/${id}`)
  }

  deleteEmpresa(id: number): Observable<Empresa> {
    return this.http.delete<Empresa>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }
}
