import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from '../Models/persona';

@Injectable({
    providedIn: 'root'
  })
  export class PersonaService {
  
    urlEndPoint = 'http://localhost:8080';
    uthEndPoint = 'auth/signup';
    urlCreate = this.urlEndPoint + '/personas';
  
    private httpHeaders = new HttpHeaders({ 'Content-Type' : 'application/json' })
  
    constructor(private http: HttpClient) { }
  
    getPerson(): Observable<Persona[]> {
      return this.http.get<Persona[]>(this.urlEndPoint);
    }
  
    createPerson(persona: Persona): Observable<Persona>{
      console.log(persona);
      return this.http.post<Persona>(this.urlCreate, persona, {headers: this.httpHeaders})
    }
  
    getPersonById(id: any): Observable<Persona> {
      return this.http.get<Persona>(`${this.urlEndPoint}/${id}`)
    }
  
  }