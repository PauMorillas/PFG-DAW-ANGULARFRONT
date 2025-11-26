import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoCalendario } from '../models/eventocalendario.interface';
import { Reserva } from '../models/reserva.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private publicUrl = 'http://localhost:8081/public/api/calendario'; // TODO: Cambiar a la url de Produccion
  private reservasUrl = 'http://localhost:8081/api/reservas';
  constructor(private http: HttpClient) {}

  // Trae todos los eventos activos de un negocio
  getEventosPorNegocio(idNegocio?: number): Observable<EventoCalendario[]> {
    if (idNegocio === undefined) {
      throw new Error('No se proporcionó un ID de negocio válido');
    }
    return this.http.get<EventoCalendario[]>(`${this.publicUrl}/eventos/negocio/${idNegocio}`);
  }

  getEventosPorServicio(idServicio: number) {
    if (idServicio === undefined) {
      throw new Error('No se proporcionó un ID de servicio válido');
    }
    return this.http.get<EventoCalendario[]>(`${this.publicUrl}/eventos/servicio/${idServicio}`);
  }

  getReservaById(id: number): Observable<Reserva> {
    if (id === undefined) {
      throw new Error('No se proporcionó un ID de reserva válido');
    }
    const url = `${this.reservasUrl}/${id}`;
    return this.http.get<Reserva>(url);
  }

  cancelarReserva(id: number): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.reservasUrl}/${id}/estado`, null, {
      params: { estado: 'CANCELADA' },
    });
  }
}
