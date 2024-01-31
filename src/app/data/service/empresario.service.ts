import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empresario } from '../model/empresario';
import { Empresario2 } from '../model/empresario';
import { map } from 'rxjs/operators';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpresarioService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/empresarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getEmpresarios(): Observable<Empresario[]> {
    return this.http.get<Empresario[]>(this.urlEndPoint);
  }

  createEmpresario(businessMan: Empresario): Observable<Empresario> {
    return this.http.post<Empresario>(this.urlEndPoint, businessMan, { headers: this.httpHeaders })
  }

  getEmpresarioById(id: any): Observable<Empresario> {
    return this.http.get<Empresario>(`${this.urlEndPoint}/${id}`)
  }
  
  getEmpresarios2(): Observable<Empresario2[]> {
    return this.http.get<Empresario2[]>(this.urlEndPoint);
  }
  checkEmpresarioExists(nombre: string): Observable<boolean> {
    return this.getEmpresarios2().pipe(
      tap(empresarios => console.log('Empresarios obtenidos:', empresarios)),
      map(empresarios => {
        const exists = empresarios.some(empre => 
          empre.usuario && empre.usuario && 
          empre.usuario.toLowerCase() === nombre.toLowerCase()
        );
        console.log(`¿Existe empresario con nombre ${nombre}? ${exists}`);
        return exists;
      }),
      catchError(error => {
        console.error('Error al verificar la existencia del administrador:', error);
        return of(false); // Devolver false en caso de error
      })
    );
  }

  getEmpresarioByUsuario(usuario: string): Observable<Empresario2 | null> {
    return this.http.get<Empresario2[]>(this.urlEndPoint).pipe(
      
      map((empresarios: Empresario2[]) => {
        //console.log('Empresarios en la respuesta:', empresarios);
        const empresarioEncontrado = empresarios.find(empresario => {
          const usuarioMinusculas = usuario.toLowerCase();
          const empresarioUsuarioMinusculas = empresario.usuario.toLowerCase();
         // console.log('Comparando:', empresarioUsuarioMinusculas, 'con', usuarioMinusculas);
          return empresarioUsuarioMinusculas === usuarioMinusculas;
        });
        return empresarioEncontrado || null;
      }),      
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        return of(null);
      })
    );
  }

  private empresarioSubject = new BehaviorSubject<Empresario | null>(null);
  setEmpresario(empresario: Empresario | null): void {
    this.empresarioSubject.next(empresario);
  }
  getEmpresario(): Observable<Empresario | null> {
    return this.empresarioSubject.asObservable();
  }
  


  
}
