
import { Negocio } from './negocio.interface';

export interface Servicio{
  id?: number | null;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fechaCreacion: string;      // LocalDateTime -> string ISO
  duracionMinutos: number;
  coste: number;
  negocioDTO: Negocio;        // negocio asociado
  listaReservasDTO?: any[] | null; // será null hasta que se mapeen las reservas asociadas
}