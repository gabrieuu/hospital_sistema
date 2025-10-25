import { Hospital } from "@/app/lib/domain/models/Hospital";

export interface IHospitalRepository {
  getAll(): Promise<Hospital[]>;
  getById(id: string): Promise<Hospital | null>;
  getByEspecialidade(especialidade: string): Promise<Hospital[]>;
  search(query: string): Promise<Hospital[]>;
}
