import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia } from '../data/model/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/provincias';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.urlEndPoint);
  }

  createProvincia(province: Provincia): Observable<Provincia> {
    return this.http.post<Provincia>(this.urlEndPoint, province, { headers: this.httpHeaders })
  }

  getProvinciaById(id: any): Observable<Provincia> {
    return this.http.get<Provincia>(`${this.urlEndPoint}/${id}`)
  }

}
