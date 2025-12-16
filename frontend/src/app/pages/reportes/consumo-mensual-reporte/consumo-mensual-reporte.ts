import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consumo-mensual-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consumo-mensual-reporte.html',
  styleUrl: './consumo-mensual-reporte.css'
})
export class ConsumoMensualReporte implements OnInit {
  registros: any[] = [];
  loading = false;
  error: string | null = null;
  
  mesSeleccionado: string = '';
  anioSeleccionado: string = '';
  quimicoSeleccionado: string = '';
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    this.loading = true;
    this.error = null;
    
    let url = 'http://localhost:8000/api/consumo-mensual/';
    const params: string[] = [];
    
    if (this.mesSeleccionado) {
      params.push(`mes=${this.mesSeleccionado}`);
    }
    if (this.anioSeleccionado) {
      params.push(`anio=${this.anioSeleccionado}`);
    }
    if (this.quimicoSeleccionado) {
      params.push(`quimico=${this.quimicoSeleccionado}`);
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
    this.mesSeleccionado = '';
    this.anioSeleccionado = '';
    this.quimicoSeleccionado = '';
    this.cargarRegistros();
  }

  exportarExcel() {
    console.log('Exportar a Excel');
  }
}
