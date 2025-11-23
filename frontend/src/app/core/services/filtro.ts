import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filtro, FiltroCreate, FiltroUpdate, PaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FiltroService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8000/api/filtros';

  getFiltros(skip: number = 0, limit: number = 100, activo?: boolean): Observable<PaginatedResponse<Filtro>> {
    let params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());
    
    if (activo !== undefined) {
      params = params.set('activo', activo.toString());
    }
    
    return this.http.get<PaginatedResponse<Filtro>>(this.apiUrl, { params });
  }

  getFiltro(id: number): Observable<Filtro> {
    return this.http.get<Filtro>(`${this.apiUrl}/${id}`);
  }

  createFiltro(filtro: FiltroCreate): Observable<Filtro> {
    return this.http.post<Filtro>(this.apiUrl, filtro);
  }

  updateFiltro(id: number, filtro: FiltroUpdate): Observable<Filtro> {
    return this.http.put<Filtro>(`${this.apiUrl}/${id}`, filtro);
  }

  deleteFiltro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
