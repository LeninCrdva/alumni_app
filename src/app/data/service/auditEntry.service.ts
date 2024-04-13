import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditEntryDTO } from '../model/DTO/AuditEntryDTO';

@Injectable({
  providedIn: 'root'
})
export class AuditEntryService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/audit-entry';

  constructor(private http: HttpClient) { }

  getAuditList(): Observable<AuditEntryDTO[]> {
    return this.http.get<AuditEntryDTO[]>(`${this.urlEndPoint}`);
  }

  createAuditory(audit: AuditEntryDTO): Observable<AuditEntryDTO> {
    return this.http.post<AuditEntryDTO>(`${this.urlEndPoint}`, audit);
  }

  getAuditById(id: any): Observable<AuditEntryDTO> {
    return this.http.get<AuditEntryDTO>(`${this.urlEndPoint}/${id}`)
  }
}