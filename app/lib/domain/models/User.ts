import { Hospital } from "@/app/lib/domain/models/Hospital";

export interface User {
  id: string;
  nome: string;
  email: string;
  hospitalId: string;
  hospital?: Hospital;
  role: 'admin' | 'medico' | 'atendente';
}
