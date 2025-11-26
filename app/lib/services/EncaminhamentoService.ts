import { Encaminhamento } from "@/app/lib/domain/models/Encaminhamento";
import { EncaminhamentoStatus } from "@/app/lib/domain/enum/EncaminhamentoStatus";
import { IEncaminhamentoRepository } from "@/app/lib/repositories/contracts/IEncaminhamentoRepository";

export class EncaminhamentoService {
  constructor(private encaminhamentoRepository: IEncaminhamentoRepository) {}

  async getAllEncaminhamentos(hospitalId: string): Promise<Encaminhamento[]> {
    return await this.encaminhamentoRepository.getAllByHospital(hospitalId);
  }

  async getEncaminhamentoById(id: string): Promise<Encaminhamento | null> {
    return await this.encaminhamentoRepository.getById(id);
  }

  async getEncaminhamentosByPaciente(pacienteId: string): Promise<Encaminhamento[]> {
    return await this.encaminhamentoRepository.getByPaciente(pacienteId);
  }

  async getEncaminhamentosByHospital(hospitalId: string): Promise<Encaminhamento[]> {
    return await this.encaminhamentoRepository.getByHospital(hospitalId);
  }

  async getPendentes(): Promise<Encaminhamento[]> {
    return await this.encaminhamentoRepository.getPendentes();
  }

  async createEncaminhamento(encaminhamentoData: Omit<Encaminhamento, 'id' | 'createdAt' | 'updatedAt'>): Promise<Encaminhamento> {
    return await this.encaminhamentoRepository.create(encaminhamentoData);
  }

  async updateEncaminhamento(id: string, encaminhamentoData: Partial<Encaminhamento>): Promise<Encaminhamento> {
    return await this.encaminhamentoRepository.update(id, encaminhamentoData);
  }

  async updateStatus(id: string, status: EncaminhamentoStatus): Promise<Encaminhamento> {
    return await this.encaminhamentoRepository.updateStatus(id, status);
  }

  async deleteEncaminhamento(id: string): Promise<void> {
    return await this.encaminhamentoRepository.delete(id);
  }
}
