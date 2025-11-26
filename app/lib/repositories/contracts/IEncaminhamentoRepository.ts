import { Encaminhamento } from "@/app/lib/domain/models/Encaminhamento";
import { EncaminhamentoStatus } from "@/app/lib/domain/enum/EncaminhamentoStatus";

export interface IEncaminhamentoRepository {
  getAllByHospital(hospitalId: string): Promise<Encaminhamento[]>;
  getById(id: string): Promise<Encaminhamento | null>;
  getByPaciente(pacienteId: string): Promise<Encaminhamento[]>;
  getByHospital(hospitalId: string): Promise<Encaminhamento[]>;
  getPendentes(): Promise<Encaminhamento[]>;
  create(encaminhamento: Omit<Encaminhamento, 'id' | 'createdAt' | 'updatedAt'>): Promise<Encaminhamento>;
  update(id: string, encaminhamento: Partial<Encaminhamento>): Promise<Encaminhamento>;
  updateStatus(id: string, status: EncaminhamentoStatus): Promise<Encaminhamento>;
  delete(id: string): Promise<void>;
}
