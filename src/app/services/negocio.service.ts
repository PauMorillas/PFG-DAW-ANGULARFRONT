import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Negocio } from '../models/negocio.interface';

@Injectable({
  providedIn: 'root',
})
export class NegocioService {
  private apiUrl = 'http://localhost:8081/api'; // TODO: Cambiar a la url de Produccion
  constructor(private http: HttpClient) {}

  // ==== CRUD de Negocios ====
  getNegocios(): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.apiUrl}/negocios`);
  }

  getNegociosByEmail(email: string): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.apiUrl}/gerentes/${email}/negocios`);
  }

  getNegocioById(id: number): Observable<Negocio> {
    return this.http.get<Negocio>(`${this.apiUrl}/negocios/${id}`);
  }

  deleteNegocio(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/negocios/${id}`);
  }

  updateNegocio(negocio: Negocio): Observable<Negocio> {
    const correo = this.getCorreoFromSesion();

    if (negocio.id === undefined || negocio.id === null) {
      throw new Error('No se puede actualizar: el negocio no tiene ID');
    }

    const payload = { ...negocio, correoGerente: correo }; // añadimos correoGerente
    return this.http.put<Negocio>(`${this.apiUrl}/negocios/${negocio.id}`, payload);
  }

  createNegocio(negocio: Negocio): Observable<Negocio> {
    const correo = this.getCorreoFromSesion();
    const payload = { ...negocio, correoGerente: correo, id: null}; // añadimos correoGerente y el id a null para spring
    return this.http.post<Negocio>(`${this.apiUrl}/negocios/create`, payload);
  }

  // ==== Helper ====
  private getCorreoFromSesion(): string {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    return session.email;
  }
}
