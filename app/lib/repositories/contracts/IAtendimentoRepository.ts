import { Atendimento } from "@/app/lib/domain/models/Atendimento";

export interface IAtendimentoRepository {
  getAllbyHospital(hospitalId: string): Promise<Atendimento[]>;
  getById(id: string): Promise<Atendimento | null>;
  getByPaciente(pacienteId: string): Promise<Atendimento[]>;
  getByHospital(hospitalId: string): Promise<Atendimento[]>;
  create(atendimento: Omit<Atendimento, 'id'>): Promise<Atendimento>;
  update(id: string, atendimento: Partial<Atendimento>): Promise<Atendimento>;
}
