import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
    // Aquí irán los métodos para manejar clientes (CRUD)
    private apiUrl: string = 'https://localhost:8081/api/clientes/registro';

    public save(cliente: Cliente): Observable<boolean> {
        // Lógica para guardar un cliente
        return this.http.post<boolean>(this.apiUrl, cliente);
    }
}