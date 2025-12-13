import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  items: MenuItem[] = [];

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.updateMenu(user);
    });
  }

  updateMenu(user: any) {
    if (!user) {
      this.items = [];
      return;
    }

    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: ['/home']
      }
    ];

    // Menú de Administración solo para ADMINISTRADOR
    if (user.rol === 'ADMINISTRADOR' || user.rol === 'ADMIN') {
      this.items.push({
        label: 'Gestión de Usuarios',
        icon: 'pi pi-users',
        routerLink: ['/admin']
      });
    }

    // Menú de Matrices de Control solo para OPERADOR
    if (user.rol === 'OPERADOR') {
      this.items.push(
        {
          label: 'Matrices',
          icon: 'pi pi-table',
          items: [
            {
              label: 'Control de Operación',
              icon: 'pi pi-cog',
              routerLink: ['/forms/control-operacion']
            },
            {
              label: 'Control de Cloro Libre',
              icon: 'pi pi-circle',
              routerLink: ['/forms/control-cloro']
            },
            {
              label: 'Monitoreo Fisicoquímico',
              icon: 'pi pi-chart-bar',
              routerLink: ['/forms/monitoreo-fisicoquimico']
            }
          ]
        },
        {
          label: 'Producción',
          icon: 'pi pi-chart-line',
          items: [
            {
              label: 'Producción de Filtros',
              icon: 'pi pi-filter',
              routerLink: ['/forms/produccion-filtros']
            },
            {
              label: 'Consumo Diario',
              icon: 'pi pi-shopping-cart',
              routerLink: ['/forms/consumo-quimicos']
            },
            {
              label: 'Consumo Mensual',
              icon: 'pi pi-calendar',
              routerLink: ['/forms/consumo-mensual']
            }
          ]
        }
      );
    }

    this.items.push({
      label: 'Cerrar Sesión',
      icon: 'pi pi-power-off',
      command: () => this.authService.logout(),
      style: { 'margin-left': 'auto' }
    });
  }
}

