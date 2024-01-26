import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logro } from '../model/logro';

@Injectable({
  providedIn: 'root'
})
export class LogroService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/logros';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getLogros(): Observable<Logro[]> {
    return this.http.get<Logro[]>(this.urlEndPoint);
  }

  createLogro(logro: Logro): Observable<Logro> {
    return this.http.post<Logro>(this.urlEndPoint, logro, { headers: this.httpHeaders })
  }

  getLogroById(id: any): Observable<Logro> {
    return this.http.get<Logro>(`${this.urlEndPoint}/${id}`)
  }
}
