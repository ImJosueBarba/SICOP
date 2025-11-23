import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  produccionHoy = signal(0);
  filtrosActivos = signal(6);
  quimicosBajoStock = signal(0);
  operadoresActivos = signal(0);
  
  ngOnInit() {
    // TODO: Cargar datos reales desde la API
    this.produccionHoy.set(1250.5);
    this.filtrosActivos.set(6);
    this.quimicosBajoStock.set(2);
    this.operadoresActivos.set(8);
  }
}
