import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Usuario } from '../data/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/';

  urlCreateUsuario = this.apiUrl + '/usuarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  datosUsuario: any = {};
  
  setDatosUsuario(datos: any): void {
    this.datosUsuario = datos;
    console.log('Datos de usuario guardados:', this.datosUsuario);
  }

  getDatosUsuario(): any {
    return this.datosUsuario; 
  }

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.http.get(this.urlCreateUsuario).pipe(
      map(response => response as Usuario[])
    );
  }
  
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`);
  }

  createPerson(usuario: Usuario):  Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/users`, usuario, {headers: this.httpHeaders,});
  }

  updateUser(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

}