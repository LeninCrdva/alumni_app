import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecoveryDTO } from '../model/Mail/RecoveryDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginDTO = { username, password };
    return this.http.post(`${this.baseUrl}/login`, loginDTO);
  }

  signup(usuarioDTO: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, usuarioDTO);
  }

  resetPassword(recoveryDto:RecoveryDTO): Observable<RecoveryDTO> {
    const url = `${this.baseUrl}/login/recovery-password`;
    return this.http.put<RecoveryDTO>(url, recoveryDto, { headers: this.httpHeaders })
  }
}
