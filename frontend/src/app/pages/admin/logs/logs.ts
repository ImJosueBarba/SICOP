import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Log {
  id: number;
  usuario_id: number;
  usuario_nombre: string;
  accion: string;
  entidad: string;
  entidad_id: number;
  detalles: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logs.html',
  styleUrl: './logs.css'
})
export class Logs implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/logs';
  
  logs: Log[] = [];
  total: number = 0;
  loading: boolean = false;
  
  // Filtros
  selectedAccion: string = '';
  selectedEntidad: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  
  // Listas para filtros
  acciones: string[] = [];
  entidades: string[] = [];
  
  // Paginación
  limit: number = 50;
  offset: number = 0;
  currentPage: number = 1;

  ngOnInit() {
    this.loadAcciones();
    this.loadEntidades();
    this.loadLogs();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  loadAcciones() {
    this.http.get<string[]>(`${this.apiUrl}/acciones`, { 
      headers: this.getAuthHeaders() 
    }).subscribe({
      next: (data) => {
        this.acciones = data;
      },
      error: (error) => {
        console.error('Error cargando acciones:', error);
      }
    });
  }

  loadEntidades() {
    this.http.get<string[]>(`${this.apiUrl}/entidades`, { 
      headers: this.getAuthHeaders() 
    }).subscribe({
      next: (data) => {
        this.entidades = data;
      },
      error: (error) => {
        console.error('Error cargando entidades:', error);
      }
    });
  }

  loadLogs() {
    this.loading = true;
    
    let params: any = {
      limit: this.limit.toString(),
      offset: this.offset.toString()
    };
    
    if (this.selectedAccion) params.accion = this.selectedAccion;
    if (this.selectedEntidad) params.entidad = this.selectedEntidad;
    if (this.fechaInicio) params.fecha_inicio = new Date(this.fechaInicio).toISOString();
    if (this.fechaFin) params.fecha_fin = new Date(this.fechaFin).toISOString();
    
    const queryString = new URLSearchParams(params).toString();
    
    this.http.get<any>(`${this.apiUrl}?${queryString}`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (response) => {
        this.logs = response.logs;
        this.total = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando logs:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.offset = 0;
    this.currentPage = 1;
    this.loadLogs();
  }

  clearFilters() {
    this.selectedAccion = '';
    this.selectedEntidad = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.applyFilters();
  }

  nextPage() {
    if (this.offset + this.limit < this.total) {
      this.offset += this.limit;
      this.currentPage++;
      this.loadLogs();
    }
  }

  previousPage() {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.currentPage--;
      this.loadLogs();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  getAccionClass(accion: string): string {
    const classes: { [key: string]: string } = {
      'LOGIN': 'bg-success',
      'LOGIN_FAILED': 'bg-danger',
      'LOGOUT': 'bg-info',
      'CREATE': 'bg-primary',
      'UPDATE': 'bg-warning',
      'DELETE': 'bg-danger'
    };
    return classes[accion] || 'bg-secondary';
  }

  parseDetalles(detalles: string): any {
    try {
      return JSON.parse(detalles);
    } catch {
      return null;
    }
  }

  // Métodos auxiliares para usar en el template
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  mathMin(a: number, b: number): number {
    return Math.min(a, b);
  }
}
