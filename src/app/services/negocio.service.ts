import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Negocio } from '../models/negocio.interface';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  private apiUrl = 'http://localhost:8081/api/gerentes'; // TODO: Cambiar a la url de Produccion
  constructor(private http: HttpClient) {}

  getNegociosByEmail(email: string): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(`${this.apiUrl}/${email}/negocios`);
  }
}
