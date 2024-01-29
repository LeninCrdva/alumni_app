import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Graduado } from '../model/graduado';
import { Graduado3 } from '../model/graduado';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GraduadoService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/graduados';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getGraduados(): Observable<Graduado[]> {
    return this.http.get<Graduado[]>(this.urlEndPoint);
  }

  createGraduado(graduado: Graduado): Observable<Graduado> {
    return this.http.post<Graduado>(this.urlEndPoint, graduado, { headers: this.httpHeaders })
  }

  getGraduadoById(id: any): Observable<Graduado> {
    return this.http.get<Graduado>(`${this.urlEndPoint}/${id}`)
  }
  //llenado de informacion 
  getGraduados2(): Observable<Graduado3[]> {
    return this.http.get<Graduado3[]>(this.urlEndPoint);
  }

  createGraduado2(graduado2: Graduado3): Observable<Graduado3> {
    return this.http.post<Graduado3>(this.urlEndPoint, graduado2, { headers: this.httpHeaders })
  }


  checkGraduadoExists(nombre: string): Observable<boolean> {
    return this.getGraduados().pipe(
      map(graduados => graduados.some(gradu => gradu.usuario.nombre_usuario === nombre))
    );
  }
  getGraduadoByUsuario(usuario: string): Observable<Graduado3 | null> {
    return this.http.get<Graduado3[]>(this.urlEndPoint).pipe(
      map(graduados => graduados.find(graduado => graduado.usuario === usuario) || null)
    );
  }
  

}
