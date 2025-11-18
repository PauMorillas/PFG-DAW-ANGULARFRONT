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

  getNegociosByEmail(email: string): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.apiUrl}/gerentes/${email}/negocios`);
  }

  deleteNegocio(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/negocios/${id}`);
  }

  updateNegocio(id: number, negocio: Negocio): Observable<Negocio> {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const correo = session.email;

    const payload = { ...negocio, correoGerente: correo }; // añadimos correoGerente
    return this.http.post<Negocio>(`${this.apiUrl}/negocios/${id}`, payload);
  }
}
