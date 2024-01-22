import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { sectorempresarial } from '../Models/sectorEmpresarial';

@Injectable({
    providedIn: 'root'
})
export class SectorEmpresarialService {

    urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/sectoresEmpresariales';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) { }

    getSectoresEmpresariales(): Observable<sectorempresarial[]> {
        return this.http.get<sectorempresarial[]>(this.urlEndPoint);
    }

    createSectorEmpresarial(sector: sectorempresarial): Observable<sectorempresarial> {
        return this.http.post<sectorempresarial>(this.urlEndPoint, sector, { headers: this.httpHeaders })
    }

    getSectorEmpresarialById(id: any): Observable<sectorempresarial> {
        return this.http.get<sectorempresarial>(`${this.urlEndPoint}/${id}`)
    }

}