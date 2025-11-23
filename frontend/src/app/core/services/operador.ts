import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operador, OperadorCreate, OperadorUpdate, PaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OperadorService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8000/api/operadores';

  getOperadores(skip: number = 0, limit: number = 100, activo?: boolean): Observable<PaginatedResponse<Operador>> {
    let params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());
    
    if (activo !== undefined) {
      params = params.set('activo', activo.toString());
    }
    
    return this.http.get<PaginatedResponse<Operador>>(this.apiUrl, { params });
  }

  getOperador(id: number): Observable<Operador> {
    return this.http.get<Operador>(`${this.apiUrl}/${id}`);
  }

  createOperador(operador: OperadorCreate): Observable<Operador> {
    return this.http.post<Operador>(this.apiUrl, operador);
  }

  updateOperador(id: number, operador: OperadorUpdate): Observable<Operador> {
    return this.http.put<Operador>(`${this.apiUrl}/${id}`, operador);
  }

  deleteOperador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
