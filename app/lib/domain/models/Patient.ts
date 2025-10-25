import { Encaminhamento } from "@/app/lib/domain/models/Encaminhamento";
import { Atendimento } from "./Atendimento";

export interface Patient {
  id: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  rg: string;
  cartaoSus: string;
  dataNascimento: string;
  telefone: string;
  email?: string;
  
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  
  informacoesSaude?: {
    tipoSanguineo?: string;
    alergias?: string[];
    medicamentosUso?: string[];
    condicoesCronicas?: string[];
  };
  
  tagId: string;
  hospitalId: string;
  
  atendimentos?: Atendimento[];
  encaminhamentos?: Encaminhamento[];
  
  createdAt: Date;
  updatedAt: Date;
}
