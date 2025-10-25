import { Hospital } from "@/app/lib/domain/models/Hospital";
import { IHospitalRepository } from "@/app/lib/repositories/contracts/IHospitalRepository";

export class HospitalService {
  constructor(private hospitalRepository: IHospitalRepository) {}

  async getAllHospitals(): Promise<Hospital[]> {
    return await this.hospitalRepository.getAll();
  }

  async getHospitalById(id: string): Promise<Hospital | null> {
    return await this.hospitalRepository.getById(id);
  }

  async getHospitalsByEspecialidade(especialidade: string): Promise<Hospital[]> {
    return await this.hospitalRepository.getByEspecialidade(especialidade);
  }

  async searchHospitals(query: string): Promise<Hospital[]> {
    return await this.hospitalRepository.search(query);
  }
}
