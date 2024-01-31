import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Experiencia } from '../model/experiencia';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private urlEndPoint = `${MAIN_ROUTE.API_ENDPOINT}/experiencias`;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getExperiencias(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.urlEndPoint)
      .pipe(
        catchError(error => {
          console.error('Error al obtener experiencias:', error);
          return throwError('Hubo un error al intentar obtener las experiencias.');
        })
      );
  }

  createExperiencia(experience: Experiencia): Observable<Experiencia> {
    return this.http.post<Experiencia>(this.urlEndPoint, experience, { headers: this.httpHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al crear la experiencia:', error);
          return throwError('Hubo un error al intentar guardar la experiencia.');
        })
      );
  }

  getExperienciaById(id: any): Observable<Experiencia> {
    return this.http.get<Experiencia>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error al obtener la experiencia con ID ${id}:`, error);
          return throwError('Hubo un error al intentar obtener la experiencia.');
        })
      );
  }

  updateExperiencia(id: any, experiencia: Experiencia): Observable<Experiencia> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.put<Experiencia>(url, experiencia, { headers: this.httpHeaders })
      .pipe(
        catchError(error => {
          console.error(`Error al actualizar la experiencia con ID ${id}:`, error);
          return throwError('Hubo un error al intentar actualizar la experiencia.');
        })
      );
  }

  deleteExperiencia(id: any): Observable<void> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.delete<void>(url, { headers: this.httpHeaders })
      .pipe(
        catchError(error => {
          console.error(`Error al eliminar la experiencia con ID ${id}:`, error);
          return throwError('Hubo un error al intentar eliminar la experiencia.');
        })
      );
  }
}
