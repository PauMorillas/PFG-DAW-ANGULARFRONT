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
  private apiUrl: string = 'https://embedbookapp.com/api'; // TODO: CAMBIAR A URL DE PRODUCCION

  public save(usuario: Usuario): Observable<any> {
    // Determinamos el endpoint al que atacaremos segun el rol de usuario
    const url = usuario.rol === 'GERENTE' ? `${this.apiUrl}/gerentes/registro` : `${this.apiUrl}/clientes/registro`;

    // Devolvemos el body tal y como lo envía el backend (map con success/message)
    return this.http.post<any>(url, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    });
  }

  public update(usuario: Usuario): Observable<any> {
    const url = usuario.rol === 'GERENTE' 
      ? `${this.apiUrl}/gerentes/editar` 
      : `${this.apiUrl}/clientes/editar`;
      
    return this.http.put<any>(url, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    });
  }

  getById(id: number, rol: 'CLIENTE' | 'GERENTE'): Observable<Usuario> {
    const url =
      rol === 'GERENTE'
        ? `${this.apiUrl}/gerentes/${id}`
        : `${this.apiUrl}/clientes/${id}`;
    return this.http.get<Usuario>(url);
  }
}