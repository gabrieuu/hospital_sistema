import { Patient } from "@/app/lib/domain/models/Patient";
import { IPatientRepository } from "@/app/lib/repositories/contracts/IPatientRepository";

export class PatientService {
  constructor(private patientRepository: IPatientRepository) {}

  async getAllPatients(): Promise<Patient[]> {
    return await this.patientRepository.getAll();
  }

  async getPatientById(id: string): Promise<Patient | null> {
    return await this.patientRepository.getById(id);
  }

  async createPatient(patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    return await this.patientRepository.create(patientData);
  }

  async updatePatient(id: string, patientData: Partial<Patient>): Promise<Patient> {
    return await this.patientRepository.update(id, patientData);
  }

  async deletePatient(id: string): Promise<void> {
    return await this.patientRepository.delete(id);
  }

  async searchPatients(query: string): Promise<Patient[]> {
    return await this.patientRepository.search(query);
  }

  async getPatientByTag(tagId: string): Promise<Patient | null> {
    return await this.patientRepository.getByTag(tagId);
  }
}
