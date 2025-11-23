export interface Quimico {
  id: number;
  codigo: string;
  nombre: string;
  tipo: string;
  unidad_medida: string;
  peso_por_unidad?: number;
  stock_minimo?: number;
  stock_actual: number;
  proveedor?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuimicoCreate {
  codigo: string;
  nombre: string;
  tipo: string;
  unidad_medida: string;
  peso_por_unidad?: number;
  stock_minimo?: number;
  stock_actual?: number;
  proveedor?: string;
}

export interface QuimicoUpdate {
  codigo?: string;
  nombre?: string;
  tipo?: string;
  unidad_medida?: string;
  peso_por_unidad?: number;
  stock_minimo?: number;
  stock_actual?: number;
  proveedor?: string;
  activo?: boolean;
}

export interface AlertaStock {
  codigo: string;
  nombre: string;
  tipo: string;
  stock_actual: number;
  stock_minimo: number;
  diferencia: number;
  nivel_alerta: 'CRITICO' | 'BAJO' | 'NORMAL';
}
