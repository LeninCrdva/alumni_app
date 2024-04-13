import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { Eventos } from '../model/Eventos';

@Injectable({
    providedIn: 'root'
})
export class Eventos_Service {

    urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/programasM';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    get(): Observable<Eventos[]> {
        return this.http.get<Eventos[]>(`${this.urlEndPoint}/list`);
    }

    create(programa: any): Observable<Eventos> {
        return this.http.post<Eventos>(`${this.urlEndPoint}/create`, programa);
    }

    update(id: any, programas_misionales: any): Observable<Eventos> {
        return this.http.put<Eventos>(`${this.urlEndPoint}/update/${id}`, programas_misionales);
    }
    
    obtenerFotoBase64(id: number): Observable<string> {
        return this.http.get(`${this.urlEndPoint}/${id}/base64`, { responseType: 'text' });
    }

    getById(id: any): Observable<Eventos> {
        return this.http.get<Eventos>(`${this.urlEndPoint}/findbyId/${id}`)
    }

    delete(id: any): Observable<void> {
        const url = `${this.urlEndPoint}/delete/${id}`;
        return this.http.delete<void>(url, { headers: this.httpHeaders });
    }
}