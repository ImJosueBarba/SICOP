import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, MenubarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Control de Operación',
        icon: 'pi pi-cog',
        routerLink: '/control-operacion'
      },
      {
        label: 'Producción de Filtros',
        icon: 'pi pi-filter',
        routerLink: '/produccion-filtros'
      },
      {
        label: 'Consumo de Químicos',
        icon: 'pi pi-shopping-cart',
        routerLink: '/consumo-quimicos'
      },
      {
        label: 'Control de Cloro',
        icon: 'pi pi-box',
        routerLink: '/control-cloro'
      },
      {
        label: 'Monitoreo Fisicoquímico',
        icon: 'pi pi-chart-bar',
        routerLink: '/monitoreo-fisicoquimico'
      }
    ];
  }
}
