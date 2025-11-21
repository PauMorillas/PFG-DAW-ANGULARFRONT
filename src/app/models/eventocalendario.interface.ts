export interface EventoCalendario {
  title: string;
  start: string;    // YYYY-MM-DDTHH:mm:ss
  end: string;      // YYYY-MM-DDTHH:mm:ss
  color?: string;
  idReserva: number;
}