import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ControlOperacion } from './forms/control-operacion/control-operacion';
import { ProduccionFiltros } from './forms/produccion-filtros/produccion-filtros';
import { ConsumoQuimicos } from './forms/consumo-quimicos/consumo-quimicos';
import { ControlCloro } from './forms/control-cloro/control-cloro';
import { MonitoreoFisicoquimico } from './forms/monitoreo-fisicoquimico/monitoreo-fisicoquimico';

import { Login } from './pages/login/login';
import { authGuard } from './auth/auth.guard';

// Importar componentes de reportes
import { ControlOperacionReporte } from './pages/reportes/control-operacion-reporte/control-operacion-reporte';
import { CloroLibreReporte } from './pages/reportes/cloro-libre-reporte/cloro-libre-reporte';
import { MonitoreoFisicoquimicoReporte } from './pages/reportes/monitoreo-fisicoquimico-reporte/monitoreo-fisicoquimico-reporte';
import { ProduccionFiltrosReporte } from './pages/reportes/produccion-filtros-reporte/produccion-filtros-reporte';
import { ConsumoDiarioReporte } from './pages/reportes/consumo-diario-reporte/consumo-diario-reporte';
import { ConsumoMensualReporte } from './pages/reportes/consumo-mensual-reporte/consumo-mensual-reporte';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Home, canActivate: [authGuard] },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
    canActivate: [authGuard]
  },
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
    path: 'admin',
    loadComponent: () => import('./pages/admin/user-management/user-management').then(m => m.UserManagement),
    canActivate: [authGuard],
    data: { roles: ['ADMINISTRADOR'] }
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/admin/user-management/user-management').then(m => m.UserManagement),
    canActivate: [authGuard],
    data: { roles: ['ADMINISTRADOR'] }
  },
  {
    path: 'logs',
    loadComponent: () => import('./pages/admin/logs/logs').then(m => m.Logs),
    canActivate: [authGuard],
    data: { roles: ['ADMINISTRADOR'] }
  },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: 'forms/control-operacion',
    component: ControlOperacion,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
  {
    path: 'forms/produccion-filtros',
    component: ProduccionFiltros,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
  {
    path: 'forms/consumo-quimicos',
    component: ConsumoQuimicos,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
  {
    path: 'forms/consumo-mensual',
    loadComponent: () => import('./forms/consumo-mensual/consumo-mensual').then(m => m.ConsumoMensual),
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
  {
    path: 'forms/control-cloro',
    component: ControlCloro,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
  {
    path: 'forms/monitoreo-fisicoquimico',
    component: MonitoreoFisicoquimico,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
  // Rutas de reportes
  {
    path: 'reportes/control-operacion',
    component: ControlOperacionReporte,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
  {
    path: 'reportes/cloro-libre',
    component: CloroLibreReporte,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
  {
    path: 'reportes/monitoreo-fisicoquimico',
    component: MonitoreoFisicoquimicoReporte,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
  {
    path: 'reportes/produccion-filtros',
    component: ProduccionFiltrosReporte,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
  {
    path: 'reportes/consumo-diario',
    component: ConsumoDiarioReporte,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
  {
    path: 'reportes/consumo-mensual',
    component: ConsumoMensualReporte,
    canActivate: [authGuard],
    data: { roles: ['OPERADOR', 'ADMINISTRADOR'] }
  },
];
