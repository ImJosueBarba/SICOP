import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ControlOperacion } from './forms/control-operacion/control-operacion';
import { ProduccionFiltros } from './forms/produccion-filtros/produccion-filtros';
import { ConsumoQuimicos } from './forms/consumo-quimicos/consumo-quimicos';
import { ControlCloro } from './forms/control-cloro/control-cloro';
import { MonitoreoFisicoquimico } from './forms/monitoreo-fisicoquimico/monitoreo-fisicoquimico';

import { Login } from './pages/login/login';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Home, canActivate: [authGuard] },
  {
    path: 'control-operacion',
    component: ControlOperacion,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMIN'] }
  },
  {
    path: 'produccion-filtros',
    component: ProduccionFiltros,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMIN'] }
  },
  {
    path: 'consumo-quimicos',
    component: ConsumoQuimicos,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMIN'] }
  },
  {
    path: 'consumo-mensual',
    loadComponent: () => import('./forms/consumo-mensual/consumo-mensual').then(m => m.ConsumoMensual),
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMIN'] }
  },
  {
    path: 'control-cloro',
    component: ControlCloro,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMIN'] }
  },
  {
    path: 'monitoreo-fisicoquimico',
    component: MonitoreoFisicoquimico,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMIN'] }
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/admin/user-management/user-management').then(m => m.UserManagement),
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  },
];
