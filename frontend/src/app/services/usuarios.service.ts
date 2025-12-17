import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolSimple } from './roles.service';

export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  username: string;
  password?: string;
  rol: RolSimple;  // Objeto rol completo
  rol_id: number;  // ID del rol
  activo: boolean;
  fecha_contratacion?: string;
  nombre_completo?: string;
  es_administrador?: boolean;
  es_operador?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UsuarioCreate {
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  username: string;
  password: string;
  rol_id: number;  // Cambiar de enum a ID
  activo: boolean;
  fecha_contratacion?: string;
}

export interface UsuarioUpdate {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  rol_id?: number;  // Cambiar de enum a ID
  activo?: boolean;
  fecha_contratacion?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/usuarios';

  getUsuarios(activo?: boolean, rol?: string): Observable<Usuario[]> {
    let url = this.apiUrl;
    const params: string[] = [];
    
    if (activo !== undefined) {
      params.push(`activo=${activo}`);
    }
    if (rol) {
      params.push(`rol=${rol}`);
    }
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    return this.http.get<Usuario[]>(url);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: UsuarioCreate): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: UsuarioUpdate): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activarUsuario(id: number): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/${id}/activar`, {});
  }
}
