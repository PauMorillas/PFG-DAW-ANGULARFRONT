export interface Cliente {
    id?: number;        // Opcional pq se genera en el backend
    nombre: string;     // requerido por defecto
    telefono?: string;
    email: string;
    pass: string;
    // ... más campos según necesidad
}