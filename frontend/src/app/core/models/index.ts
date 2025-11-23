// Modelos principales
export * from './operador.model';
export * from './quimico.model';
export * from './filtro.model';
export * from './control-operacion.model';
export * from './produccion-filtro.model';

// Respuestas paginadas
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}
