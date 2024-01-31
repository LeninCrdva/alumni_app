import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador } from '../model/administrador';
import { Administrador2 } from '../model/administrador';
import { map } from 'rxjs/operators';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/administradores';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getAdministradores(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(this.urlEndPoint);
  }
  //buscar por nombre
  getAdministradores2(): Observable<Administrador2[]> {
    return this.http.get<Administrador2[]>(this.urlEndPoint);
  }

  createAdministrador(administrador: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(this.urlEndPoint, administrador, { headers: this.httpHeaders })
  }

  getAdministradorById(id: any): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.urlEndPoint}/${id}`)
  }
  checkAdministradorExists(nombre: string): Observable<boolean> {
    return this.getAdministradores2().pipe(
      tap(administradores => console.log('Administradores obtenidos:', administradores)),
      map(administradores => {
        const exists = administradores.some(admin => 
          admin.usuario && admin.usuario.nombre_usuario && 
          admin.usuario.nombre_usuario.toLowerCase() === nombre.toLowerCase()
        );
        console.log(`¿Existe administrador con nombre ${nombre}? ${exists}`);
        return exists;
      }),
      catchError(error => {
        console.error('Error al verificar la existencia del administrador:', error);
        return of(false); // Devolver false en caso de error
      })
    );
  }
  
  
}
