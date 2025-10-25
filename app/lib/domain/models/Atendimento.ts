export interface Atendimento {
  id: string;
  pacienteId: string;
  hospitalId: string;
  tipo: string;
  descricao: string;
  data: Date;
  medico?: string;
}
