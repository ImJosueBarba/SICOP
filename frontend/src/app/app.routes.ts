import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ControlOperacion } from './forms/control-operacion/control-operacion';
import { ProduccionFiltros } from './forms/produccion-filtros/produccion-filtros';
import { ConsumoQuimicos } from './forms/consumo-quimicos/consumo-quimicos';
import { ControlCloro } from './forms/control-cloro/control-cloro';
import { MonitoreoFisicoquimico } from './forms/monitoreo-fisicoquimico/monitoreo-fisicoquimico';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'control-operacion', component: ControlOperacion },
  { path: 'produccion-filtros', component: ProduccionFiltros },
  { path: 'consumo-quimicos', component: ConsumoQuimicos },
  { path: 'control-cloro', component: ControlCloro },
  { path: 'monitoreo-fisicoquimico', component: MonitoreoFisicoquimico },
];
