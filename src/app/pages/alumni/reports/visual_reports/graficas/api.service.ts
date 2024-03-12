import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    private baseUrl = 'http://localhost:8080';  
  
    constructor(private http: HttpClient) { }
  
    getPostulacionesPorDia(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/ofertas-laborales/postulaciones-por-dia`);
    }
    getGraduadosConExperiencia(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/experiencias/graduados-con-experiencia`);
    }
    getCargoConOfertas(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/ofertas-laborales/cargos-con-ofertas`);
    }
  }
