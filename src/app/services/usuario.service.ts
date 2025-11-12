import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
    // Aquí irán los métodos para manejar clientes (CRUD)
  private apiUrl: string = 'http://localhost:8081/api/clientes/registro';

  public save(usuario: Usuario): Observable<any> {

    // Devolvemos el body tal y como lo envía el backend (map con success/message)
    return this.http.post<any>(this.apiUrl, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    });
  }
}