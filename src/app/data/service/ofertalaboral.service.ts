import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ofertaLaboral } from '../model/ofertaLaboral';
import { ofertaLaboralDTO } from '../model/ofertaLaboralDTO';
import { Observable } from 'rxjs';
import { Graduado } from '../model/graduado';

@Injectable({
  providedIn: 'root'
})
export class OfertalaboralService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/ofertas-laborales';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getGraduadosByOfertaLaboral(id: number): Observable<Graduado[]>{

    return this.http.get<Graduado[]>(`${this.urlEndPoint}/graduados/${id}`)
  }
  OfertasLaborales(name:string): Observable<ofertaLaboralDTO[]> {
    return this.http.get<ofertaLaboralDTO[]>(`${this.urlEndPoint}/empresario/${name}`);
  }
  getOfertasLaborales(): Observable<ofertaLaboralDTO[]> {
    return this.http.get<ofertaLaboralDTO[]>(`${this.urlEndPoint}`);
  }
  getOfertasLaboralesByEmpresario(name: string): Observable<ofertaLaboralDTO[]> {
    return this.http.get<ofertaLaboralDTO[]>(`${this.urlEndPoint}/usuario/${name}`);
  }
  
  getOfertasLaboralesByNameEmpresario(name: string): Observable<ofertaLaboralDTO[]> {
    return this.http.get<ofertaLaboralDTO[]>(`${this.urlEndPoint}/empresario/${name}`);
  }

  createOfertaLaboral(oferta: ofertaLaboral): Observable<ofertaLaboral> {
    return this.http.post<ofertaLaboral>(this.urlEndPoint, oferta, { headers: this.httpHeaders })
  }

  getOfertaLaboralById(id: number): Observable<ofertaLaboral> {
    return this.http.get<ofertaLaboral>(`${this.urlEndPoint}/${id}`)
  }

  getOfertaLaboralByIdToDTO(id: number): Observable<ofertaLaboralDTO> {
    return this.http.get<ofertaLaboralDTO>(`${this.urlEndPoint}/dto/${id}`)
  }

  updateOfertaLaboral(id: number, ofertaLaboralDTO: ofertaLaboralDTO): Observable<any> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.put(url, ofertaLaboralDTO);
  }

  deleteOfertabyID  (id: number): Observable<any> {
    return this.http.delete(`${this.urlEndPoint}/${id}`);
  }
}
