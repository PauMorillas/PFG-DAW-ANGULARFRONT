import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
    // Aquí irán los métodos para manejar clientes (CRUD)
    static apiUrl: string = 'https://localhost:8080/api/clientes';

    public save() {
        // Lógica para guardar un cliente
        console.log('Guardar un cliente');
    }
}