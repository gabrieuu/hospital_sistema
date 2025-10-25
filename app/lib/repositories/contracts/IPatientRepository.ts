import { Patient } from "@/app/lib/domain/models/Patient";

export interface IPatientRepository {
  getAll(): Promise<Patient[]>;
  getById(id: string): Promise<Patient | null>;
  create(patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient>;
  update(id: string, patient: Partial<Patient>): Promise<Patient>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Patient[]>;
  getByTag(tagId: string): Promise<Patient | null>;
}
