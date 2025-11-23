import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { OperadorList } from './pages/operadores/operador-list/operador-list';
import { QuimicoList } from './pages/quimicos/quimico-list/quimico-list';
import { ControlOperacionList } from './pages/control-operacion/control-operacion-list/control-operacion-list';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'operadores', component: OperadorList },
  { path: 'quimicos', component: QuimicoList },
  { path: 'control-operacion', component: ControlOperacionList },
];
