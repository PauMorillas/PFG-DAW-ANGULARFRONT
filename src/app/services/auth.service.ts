import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8081/api'; // TODO: Cambiar a la url de Produccion

  constructor(private http: HttpClient) {}

  loginGerente(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/gerentes/login`, credentials)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error))
      );
  }

  loginCliente(credentials: LoginRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/clientes/login`, credentials)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error))
      );
  }

  logout(): void {
    localStorage.removeItem('session');
  }
}
