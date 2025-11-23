import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quimico, QuimicoCreate, QuimicoUpdate, AlertaStock, PaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class QuimicoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8000/api/quimicos';

  getQuimicos(skip: number = 0, limit: number = 100, activo?: boolean, tipo?: string): Observable<PaginatedResponse<Quimico>> {
    let params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());
    
    if (activo !== undefined) {
      params = params.set('activo', activo.toString());
    }
    if (tipo) {
      params = params.set('tipo', tipo);
    }
    
    return this.http.get<PaginatedResponse<Quimico>>(this.apiUrl, { params });
  }

  getQuimico(id: number): Observable<Quimico> {
    return this.http.get<Quimico>(`${this.apiUrl}/${id}`);
  }

  createQuimico(quimico: QuimicoCreate): Observable<Quimico> {
    return this.http.post<Quimico>(this.apiUrl, quimico);
  }

  updateQuimico(id: number, quimico: QuimicoUpdate): Observable<Quimico> {
    return this.http.put<Quimico>(`${this.apiUrl}/${id}`, quimico);
  }

  deleteQuimico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAlertasStock(): Observable<AlertaStock[]> {
    return this.http.get<AlertaStock[]>(`${this.apiUrl}/alertas-stock`);
  }
}
