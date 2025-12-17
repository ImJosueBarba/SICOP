import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rol {
  id: number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  nivel_jerarquia: number;
  categoria: string;
  activo: boolean;
  created_at?: string;
}

export interface RolSimple {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  nivel_jerarquia: number;
  activo: boolean;
}

export interface RolCreate {
  codigo: string;
  nombre: string;
  descripcion?: string;
  nivel_jerarquia: number;
  categoria: string;
  activo?: boolean;
}

export interface RolUpdate {
  codigo?: string;
  nombre?: string;
  descripcion?: string;
  nivel_jerarquia?: number;
  categoria?: string;
  activo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/roles';

  getRoles(activo?: boolean, categoria?: string): Observable<RolSimple[]> {
    let url = this.apiUrl;
    const params: string[] = [];
    
    if (activo !== undefined) {
      params.push(`activo=${activo}`);
    }
    if (categoria) {
      params.push(`categoria=${categoria}`);
    }
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    return this.http.get<RolSimple[]>(url);
  }

  getRol(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/${id}`);
  }

  getRolesPorCategoria(categoria: string, activo: boolean = true): Observable<RolSimple[]> {
    return this.http.get<RolSimple[]>(`${this.apiUrl}/categoria/${categoria}?activo=${activo}`);
  }

  createRol(rol: RolCreate): Observable<Rol> {
    return this.http.post<Rol>(this.apiUrl, rol);
  }

  updateRol(id: number, rol: RolUpdate): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}/${id}`, rol);
  }

  deleteRol(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
