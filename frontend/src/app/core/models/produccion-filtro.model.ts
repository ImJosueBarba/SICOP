export interface ProduccionFiltro {
  id: number;
  fecha: string;
  hora: string;
  filtro1_h?: number;
  filtro1_q?: number;
  filtro2_h?: number;
  filtro2_q?: number;
  filtro3_h?: number;
  filtro3_q?: number;
  filtro4_h?: number;
  filtro4_q?: number;
  filtro5_h?: number;
  filtro5_q?: number;
  filtro6_h?: number;
  filtro6_q?: number;
  caudal_total?: number;
  observaciones?: string;
  operador_id?: number;
  created_at: string;
  updated_at: string;
}

export interface ProduccionFiltroCreate {
  fecha: string;
  hora: string;
  filtro1_h?: number;
  filtro1_q?: number;
  filtro2_h?: number;
  filtro2_q?: number;
  filtro3_h?: number;
  filtro3_q?: number;
  filtro4_h?: number;
  filtro4_q?: number;
  filtro5_h?: number;
  filtro5_q?: number;
  filtro6_h?: number;
  filtro6_q?: number;
  observaciones?: string;
  operador_id?: number;
}

export interface ProduccionFiltroUpdate {
  fecha?: string;
  hora?: string;
  filtro1_h?: number;
  filtro1_q?: number;
  filtro2_h?: number;
  filtro2_q?: number;
  filtro3_h?: number;
  filtro3_q?: number;
  filtro4_h?: number;
  filtro4_q?: number;
  filtro5_h?: number;
  filtro5_q?: number;
  filtro6_h?: number;
  filtro6_q?: number;
  observaciones?: string;
  operador_id?: number;
}
