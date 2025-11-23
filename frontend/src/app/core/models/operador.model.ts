export interface Operador {
  id: number;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  activo: boolean;
  fecha_contratacion?: string;
  created_at: string;
  updated_at: string;
}

export interface OperadorCreate {
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  fecha_contratacion?: string;
}

export interface OperadorUpdate {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  activo?: boolean;
  fecha_contratacion?: string;
}
