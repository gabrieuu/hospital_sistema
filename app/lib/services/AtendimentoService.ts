import { Atendimento } from "@/app/lib/domain/models/Atendimento";
import { IAtendimentoRepository } from "@/app/lib/repositories/contracts/IAtendimentoRepository";

export class AtendimentoService {
  constructor(private atendimentoRepository: IAtendimentoRepository) {}

  async getAllAtendimentos(): Promise<Atendimento[]> {
    return await this.atendimentoRepository.getAll();
  }

  async getAtendimentoById(id: string): Promise<Atendimento | null> {
    return await this.atendimentoRepository.getById(id);
  }

  async getAtendimentosByPaciente(pacienteId: string): Promise<Atendimento[]> {
    return await this.atendimentoRepository.getByPaciente(pacienteId);
  }

  async getAtendimentosByHospital(hospitalId: string): Promise<Atendimento[]> {
    return await this.atendimentoRepository.getByHospital(hospitalId);
  }

  async createAtendimento(atendimentoData: Omit<Atendimento, 'id'>): Promise<Atendimento> {
    return await this.atendimentoRepository.create(atendimentoData);
  }

  async updateAtendimento(id: string, atendimentoData: Partial<Atendimento>): Promise<Atendimento> {
    return await this.atendimentoRepository.update(id, atendimentoData);
  }
}
