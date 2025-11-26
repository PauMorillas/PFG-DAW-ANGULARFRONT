import { Usuario } from './usuario.interface'; // Interfaz ya proporcionada
import { Servicio } from './servicio.interface'; // Interfaz ya proporcionada

/**
 * Representa una Reserva de la Base de Datos.
 * Mapea la estructura de la ReservaDTO del backend.
 */
export interface Reserva {
    id?: number; 
    
    /** Fecha y hora de inicio de la reserva (LocalDateTime se mapea a string ISO 8601). */
    fechaInicio: string;
    
    /** Fecha y hora de fin de la reserva (LocalDateTime se mapea a string ISO 8601). */
    fechaFin: string;
    
    estado: 'ACTIVA' | 'CANCELADA' | 'EXPIRADA';
    
    clienteDTO: Usuario;
    
    servicioDTO: Servicio;
}