
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoCalendario } from '../models/eventocalendario.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = 'http://localhost:8081/public/api/calendario'; // TODO: Cambiar a la url de Produccion
  constructor(private http: HttpClient) {}

  // Trae todos los eventos activos de un negocio
  getEventosPorNegocio(idNegocio?: number): Observable<EventoCalendario[]> {
    if (idNegocio === undefined) {
      throw new Error('No se proporcionó un ID de negocio válido');
    }
    return this.http.get<EventoCalendario[]>(`${this.apiUrl}/eventos/negocio/${idNegocio}`);
  }

  getEventosPorServicio(idServicio: number) {
    if (idServicio === undefined) {
      throw new Error('No se proporcionó un ID de servicio válido');
    }
    return this.http.get<EventoCalendario[]>(`${this.apiUrl}/eventos/servicio/${idServicio}`);
  }
}