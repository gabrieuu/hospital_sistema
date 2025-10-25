import { EncaminhamentoStatus } from "@/app/lib/domain/enum/EncaminhamentoStatus";
import { UrgencyLevel } from "@/app/lib/domain/enum/UrgencyLevel";
import { Hospital } from "@/app/lib/domain/models/Hospital";
import { Patient } from "@/app/lib/domain/models/Patient";

export interface Encaminhamento {
  id: string;
  pacienteId: string;
  paciente?: Patient;
  hospitalOrigemId: string;
  hospitalDestinoId: string;
  hospitalDestino?: Hospital;
  
  tipoExame: string;
  urgencia: UrgencyLevel;
  status: EncaminhamentoStatus;
  
  observacoes?: string;
  tempoEstimado?: string;
  
  createdAt: Date;
  updatedAt: Date;
}
