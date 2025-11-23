export interface Filtro {
  id: number;
  numero: number;
  nombre: string;
  capacidad_maxima?: number;
  altura_maxima?: number;
  fecha_instalacion?: string;
  estado: string;
  ultima_limpieza?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface FiltroCreate {
  numero: number;
  nombre: string;
  capacidad_maxima?: number;
  altura_maxima?: number;
  fecha_instalacion?: string;
  estado?: string;
}

export interface FiltroUpdate {
  numero?: number;
  nombre?: string;
  capacidad_maxima?: number;
  altura_maxima?: number;
  fecha_instalacion?: string;
  estado?: string;
  ultima_limpieza?: string;
  activo?: boolean;
}
