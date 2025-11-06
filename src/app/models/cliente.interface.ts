export interface Cliente {
    id?: number;        // Opcional pq se genera en el backend
    nombre: string;     // requerido por defecto
    telefono?: string;
    email: string;
    // ... más campos según necesidad
    }