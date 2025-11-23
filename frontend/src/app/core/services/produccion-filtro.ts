import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProduccionFiltro, ProduccionFiltroCreate, ProduccionFiltroUpdate, PaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProduccionFiltroService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8000/api/produccion-filtros';

  getRegistros(skip: number = 0, limit: number = 100, fecha_desde?: string, fecha_hasta?: string): Observable<PaginatedResponse<ProduccionFiltro>> {
    let params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());
    
    if (fecha_desde) {
      params = params.set('fecha_desde', fecha_desde);
    }
    if (fecha_hasta) {
      params = params.set('fecha_hasta', fecha_hasta);
    }
    
    return this.http.get<PaginatedResponse<ProduccionFiltro>>(this.apiUrl, { params });
  }

  getRegistro(id: number): Observable<ProduccionFiltro> {
    return this.http.get<ProduccionFiltro>(`${this.apiUrl}/${id}`);
  }

  createRegistro(registro: ProduccionFiltroCreate): Observable<ProduccionFiltro> {
    return this.http.post<ProduccionFiltro>(this.apiUrl, registro);
  }

  updateRegistro(id: number, registro: ProduccionFiltroUpdate): Observable<ProduccionFiltro> {
    return this.http.put<ProduccionFiltro>(`${this.apiUrl}/${id}`, registro);
  }

  deleteRegistro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
