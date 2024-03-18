import { Injectable } from '@angular/core';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Graduado } from '../model/graduado';
import { Graduado3 } from '../model/graduado';
import { Graduado1 } from '../model/graduado';
import { map } from 'rxjs/operators';
import { ofertaLaboral } from '../model/ofertaLaboral';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { GraduadoDTO } from '../model/DTO/GraduadoDTO';

@Injectable({
  providedIn: 'root'
})
export class GraduadoService {

  urlEndPoint = MAIN_ROUTE.API_ENDPOINT + '/graduados';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  get(): Observable<Graduado[]> {
    return this.http.get<Graduado[]>(this.urlEndPoint);
  }

  getDTO(): Observable<GraduadoDTO[]> {
    return this.http.get<GraduadoDTO[]>(this.urlEndPoint);
  }

  create(graduado: Graduado): Observable<Graduado> {
    return this.http.post<Graduado>(this.urlEndPoint, graduado, { headers: this.httpHeaders })
  }

  getById(id: any): Observable<Graduado> {
    return this.http.get<Graduado>(`${this.urlEndPoint}/${id}`)
  }
  //llenado de informacion 
  gets2(): Observable<Graduado3[]> {
    return this.http.get<Graduado3[]>(this.urlEndPoint);
  }

  create2(graduado2: Graduado3): Observable<Graduado3> {
    return this.http.post<Graduado3>(this.urlEndPoint, graduado2, { headers: this.httpHeaders })
  }

  createDTO(graduadoDTO: GraduadoDTO): Observable<GraduadoDTO> {
    return this.http.post<GraduadoDTO>(this.urlEndPoint, graduadoDTO, { headers: this.httpHeaders })
  }

  checkGraduadoExists(nombre: string): Observable<boolean> {
    return this.gets2().pipe(
      tap(graduados => console.log('Administradores obtenidos:', graduados)),
      map(graduados => {
        const exists = graduados.some(gradu =>
          gradu.usuario && gradu.usuario &&
          gradu.usuario.toLowerCase() === nombre.toLowerCase()
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
  getByUsuario(usuario: string): Observable<Graduado3 | null> {
    return this.http.get<Graduado3[]>(this.urlEndPoint).pipe(
      map(graduados => graduados.find(graduado => graduado.usuario === usuario) || null)
    );
  }

  getByUserId(idUser: any): Observable<Graduado> {
    return this.http.get<Graduado>(`${this.urlEndPoint}/usuario/${idUser}`);
  }

  getDTOByUserId(idUser: number): Observable<GraduadoDTO> {
    return this.http.get<GraduadoDTO>(`${this.urlEndPoint}/usuario/${idUser}`);
  }

  updateOfferInGraduado(graduado: GraduadoDTO, idGraduado: number): Observable<GraduadoDTO> {
    return this.http.put<GraduadoDTO>(`${this.urlEndPoint}/postulaciones/${idGraduado}`, graduado, { headers: this.httpHeaders })
  }

  cancelOfferInGraduado(graduado: GraduadoDTO, idGraduado: number): Observable<GraduadoDTO> {
    return this.http.put<GraduadoDTO>(`${this.urlEndPoint}/cancel-postulaciones/${idGraduado}`, graduado, { headers: this.httpHeaders })
  }

  getOfertasLaboralesByUsername(username: string): Observable<ofertaLaboral[]> {
    return this.http.get<ofertaLaboral[]>(`${this.urlEndPoint}/user/${username}`);
  }

  getByUsuarioId(id: any): Observable<GraduadoDTO> {
    return this.http.get<GraduadoDTO>(`${this.urlEndPoint}/usuario/${id}`)
  }

  getsWithOutOferta(): Observable<Graduado[]> {
    return this.http.get<Graduado[]>(`${this.urlEndPoint}/without-oferta`);
  }
  getSinPostular(): Observable<Graduado1[]> {
    return this.http.get<Graduado1[]>(`${this.urlEndPoint}/without-oferta`);
  }
  getConPostulacion(): Observable<Graduado1[]> {
    return this.http.get<Graduado1[]>(`${this.urlEndPoint}/with-oferta`);
  }
  searchGraduadosByUsuario(usuario: string): Observable<Graduado3[]> {
    return this.http.get<Graduado3[]>(this.urlEndPoint).pipe(
      map(graduados => {
        console.log('Nombres de usuario en la lista:', graduados.map(graduado => graduado.usuario));
        return graduados.filter(graduado => graduado.usuario.toLowerCase().includes(usuario.toLowerCase()));
      })
    );
  }

  updateGraduadoDTO(id: any, graduado: GraduadoDTO): Observable<GraduadoDTO> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.put<GraduadoDTO>(url, graduado, { headers: this.httpHeaders });
  }
  getWithoutDTO(): Observable<Graduado1[]> {
    return this.http.get<Graduado1[]>(`${this.urlEndPoint}/all`);
  }
  getSinExperiencia(): Observable<Graduado1[]> {
    return this.http.get<Graduado1[]>(`${this.urlEndPoint}/sin-experiencia`)
  }
}
