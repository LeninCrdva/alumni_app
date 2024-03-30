import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Usuario } from '../model/usuario';
import { UserDTO } from '../model/DTO/UserDTO';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';

  urlCreateUsuario = this.apiUrl + '/usuarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  datosUsuario: any = {};

  setDatosUsuario(datos: any): void {
    this.datosUsuario = datos;
    console.log('Datos de usuario guardados:', this.datosUsuario);
  }

  getDatosUsuario(): any {
    return this.datosUsuario;
  }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Usuario[]> {
    return this.http.get(this.urlCreateUsuario).pipe(
      map(response => response as Usuario[])
    );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`);
  }
  
  getUsersDTO(): Observable<UserDTO[]> {
    return this.http.get(this.urlCreateUsuario).pipe(
      map(response => response as UserDTO[])
    );
  }

  getUsuarioByUsername(username: string|null): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/by-username/${username}`;
    return this.http.get<Usuario>(url);
  }

  getUserDTOById(id: any): Observable<UserDTO> {
    const url = `${this.apiUrl}/usuarios/resumen/${id}`;
    return this.http.get<UserDTO>(url);
  }

  createPerson(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/users`, usuario, { headers: this.httpHeaders, });
  }

  updateUser(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  updateUserPhoto(id: number, route: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/photo/${id}/${route}`, null);
  }

  getUserByUsername(username: string): Observable<any> {
    const url = `${this.apiUrl}/usuarios/by-username/${username}`;

    return this.http.get(url).pipe(
      map(response => {
        // Puedes realizar manipulaciones en la respuesta aquí si es necesario
        return response;
      }),
      catchError(error => {
        // Puedes manejar diferentes tipos de errores de manera más específica
        console.error('Error getting user by username:', error);

        // Puedes lanzar un error personalizado con un mensaje más informativo
        let errorMessage = 'Error desconocido al obtener el usuario.';
        if (error.status === 404) {
          errorMessage = 'Usuario no encontrado.';
        } else if (error.status === 403) {
          errorMessage = 'Acceso no autorizado.';
        }

        return throwError(errorMessage);
      })
    );
  }

}