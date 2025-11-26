import { Servicio } from './servicio.interface';

export interface Negocio {
  id?: number;
  nombre: string;
  correoElec: string;
  telfContacto: string;
  horaApertura: string; // HH:mm
  horaCierre: string; // HH:mm
  diasApertura: string;
  correoGerente: string; // email del gerente que viene de la sesión (para la lógica del backend)
  listaServiciosDTO?: Servicio[] | null; // será null hasta que se mapeen los servicios
}
