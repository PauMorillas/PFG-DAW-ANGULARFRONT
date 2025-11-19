import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private apiUrl = 'http://localhost:8081/api/servicios';

  constructor(private http: HttpClient) {}

  // TODO: ESTA RUTA VA A FALLAR
  getServicioById(idServicio: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${idServicio}`);
  }

  getServiciosByNegocio(idNegocio: number): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/negocio/${idNegocio}`);
  }

  create(idNegocio: number, servicio: Servicio): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear/${idNegocio}`, servicio);
  }

  update(idServicio: number, servicio: Servicio): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${idServicio}`, servicio);
  }

  delete(idServicio: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/borrar/${idServicio}`);
  }
}
