import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, MenubarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
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
        routerLink: '/'
      }
    ];

    if (user.rol === 'ADMIN') {
      this.items.push({
        label: 'Usuarios',
        icon: 'pi pi-users',
        routerLink: '/usuarios'
      });
    }

    if (user.rol === 'OPERADOR' || user.rol === 'ADMIN') {
      this.items.push(
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
          label: 'Consumo Mensual',
          icon: 'pi pi-calendar',
          routerLink: '/consumo-mensual'
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
