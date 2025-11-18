export interface Negocio {
  id?: number;
  nombre: string;
  correoElec: string;
  telfContacto: string;
  horaApertura: string; // HH:mm
  horaCierre: string;  // HH:mm
  correoGerente: string; // email del gerente que viene de la sesión (para la lógica del backend)
  listaServiciosDTO?: any[] | null; // será null hasta que se mapeen los servicios
}