import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ControlOperacion, ControlOperacionCreate, ControlOperacionUpdate, PaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ControlOperacionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8000/api/control-operacion';

  getRegistros(skip: number = 0, limit: number = 100, fecha_desde?: string, fecha_hasta?: string): Observable<PaginatedResponse<ControlOperacion>> {
    let params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());
    
    if (fecha_desde) {
      params = params.set('fecha_desde', fecha_desde);
    }
    if (fecha_hasta) {
      params = params.set('fecha_hasta', fecha_hasta);
    }
    
    return this.http.get<PaginatedResponse<ControlOperacion>>(this.apiUrl, { params });
  }

  getRegistro(id: number): Observable<ControlOperacion> {
    return this.http.get<ControlOperacion>(`${this.apiUrl}/${id}`);
  }

  createRegistro(registro: ControlOperacionCreate): Observable<ControlOperacion> {
    return this.http.post<ControlOperacion>(this.apiUrl, registro);
  }

  updateRegistro(id: number, registro: ControlOperacionUpdate): Observable<ControlOperacion> {
    return this.http.put<ControlOperacion>(`${this.apiUrl}/${id}`, registro);
  }

  deleteRegistro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
