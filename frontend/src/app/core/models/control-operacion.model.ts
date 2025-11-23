export interface ControlOperacion {
  id: number;
  fecha: string;
  hora: string;
  turbedad_ac?: number;
  turbedad_at?: number;
  color?: string;
  ph_ac?: number;
  ph_sulf?: number;
  ph_at?: number;
  dosis_sulfato?: number;
  dosis_cal?: number;
  dosis_floergel?: number;
  ff?: number;
  clarificacion_is?: number;
  clarificacion_cs?: number;
  clarificacion_fs?: number;
  presion_psi?: number;
  presion_pre?: number;
  presion_pos?: number;
  presion_total?: number;
  cloro_residual?: number;
  observaciones?: string;
  operador_id?: number;
  created_at: string;
  updated_at: string;
}

export interface ControlOperacionCreate {
  fecha: string;
  hora: string;
  turbedad_ac?: number;
  turbedad_at?: number;
  color?: string;
  ph_ac?: number;
  ph_sulf?: number;
  ph_at?: number;
  dosis_sulfato?: number;
  dosis_cal?: number;
  dosis_floergel?: number;
  ff?: number;
  clarificacion_is?: number;
  clarificacion_cs?: number;
  clarificacion_fs?: number;
  presion_psi?: number;
  presion_pre?: number;
  presion_pos?: number;
  presion_total?: number;
  cloro_residual?: number;
  observaciones?: string;
  operador_id?: number;
}

export interface ControlOperacionUpdate {
  fecha?: string;
  hora?: string;
  turbedad_ac?: number;
  turbedad_at?: number;
  color?: string;
  ph_ac?: number;
  ph_sulf?: number;
  ph_at?: number;
  dosis_sulfato?: number;
  dosis_cal?: number;
  dosis_floergel?: number;
  ff?: number;
  clarificacion_is?: number;
  clarificacion_cs?: number;
  clarificacion_fs?: number;
  presion_psi?: number;
  presion_pre?: number;
  presion_pos?: number;
  presion_total?: number;
  cloro_residual?: number;
  observaciones?: string;
  operador_id?: number;
}
