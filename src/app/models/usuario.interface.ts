export interface Usuario {
    id?: number;        // Opcional pq se genera en el backend
    nombre: string;     // requerido por defecto
    telf?: string;
    email: string;
    pass: string;
    rol: 'CLIENTE' | 'GERENTE';
}