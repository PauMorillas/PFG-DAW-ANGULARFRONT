export interface Negocio {
  id: number;
  nombre: string;
  correoElec: string;
  telfContacto: string;
  horaApertura: string; // HH:mm
  horaCierre: string;   // HH:mm
  gerenteDTO: any | null; // sera null hasta que se mapee gerente
  listaServiciosDTO: any[] | null; // será null hasta que se mapeen los servicios
}