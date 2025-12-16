import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cloro-libre-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cloro-libre-reporte.html',
  styleUrl: './cloro-libre-reporte.css'
})
export class CloroLibreReporte implements OnInit {
  registros: any[] = [];
  loading = false;
  error: string | null = null;
  
  // Filtros
  fechaInicio: string = '';
  fechaFin: string = '';
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    this.loading = true;
    this.error = null;
    
    let url = 'http://localhost:8000/api/control-cloro/';
    const params: string[] = [];
    
    if (this.fechaInicio) {
      params.push(`fecha_inicio=${this.fechaInicio}`);
    }
    if (this.fechaFin) {
      params.push(`fecha_fin=${this.fechaFin}`);
    }
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.registros = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los registros';
        console.error(err);
        this.loading = false;
      }
    });
  }

  filtrar() {
    this.cargarRegistros();
  }

  limpiarFiltros() {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.cargarRegistros();
  }

  exportarExcel() {
    console.log('Exportar a Excel');
  }
}
