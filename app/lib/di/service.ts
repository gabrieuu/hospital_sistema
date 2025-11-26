import {
  MockAtendimentoRepository,
  MockAuthRepository,
  MockEncaminhamentoRepository,
  MockHospitalRepository,
  MockPatientRepository,
  MockStatsRepository,
} from '@/app/lib/repositories/implementations/MockRepositories';

import { AtendimentoService } from '@/app/lib/services/AtendimentoService';
import { DashboardService } from '@/app/lib/services/DashboardService';
import { EncaminhamentoService } from '@/app/lib/services/EncaminhamentoService';
import { HospitalService } from '@/app/lib/services/HospitalService';
import { PatientService } from '@/app/lib/services/PatientService';
import { AuthService } from '../services/AuthService';
import { get } from 'http';

// ================================================================
// SINGLETON INSTANCES (In-memory during session)
// ================================================================

let patientRepositoryInstance: MockPatientRepository | null = null;
let encaminhamentoRepositoryInstance: MockEncaminhamentoRepository | null = null;
let hospitalRepositoryInstance: MockHospitalRepository | null = null;
let atendimentoRepositoryInstance: MockAtendimentoRepository | null = null;
let statsRepositoryInstance: MockStatsRepository | null = null;
let authRepositoryInstance: MockAuthRepository | null = null;
// ================================================================
// DIRECT  FOR EASY USAGE IN COMPONENTS
// ================================================================

export const Modular = {
    patientService: new PatientService(getPatientRepository()),
    encaminhamentoService: new EncaminhamentoService(getEncaminhamentoRepository()),
    hospitalService: new HospitalService(getHospitalRepository()),
    atendimentoService: new AtendimentoService(getAtendimentoRepository()),
    dashboardService: new DashboardService(getStatsRepository()),
    authService: new AuthService(getAuthRepository()),
}

// ================================================================
// REPOSITORY GETTERS (Singletons)
// ================================================================

function getAuthRepository() {
  if (!authRepositoryInstance) {
    authRepositoryInstance = new MockAuthRepository();
  }
  return authRepositoryInstance;
}

function getPatientRepository() {
  if (!patientRepositoryInstance) {
    patientRepositoryInstance = new MockPatientRepository();
  }
  return patientRepositoryInstance;
}
  
function getEncaminhamentoRepository() {
  if (!encaminhamentoRepositoryInstance) {
    encaminhamentoRepositoryInstance = new MockEncaminhamentoRepository();
  }
  return encaminhamentoRepositoryInstance;
}

function getHospitalRepository() {
  if (!hospitalRepositoryInstance) {
    hospitalRepositoryInstance = new MockHospitalRepository();
  }
  return hospitalRepositoryInstance;
}


function getAtendimentoRepository() {
  if (!atendimentoRepositoryInstance) {
    atendimentoRepositoryInstance = new MockAtendimentoRepository();
  }
  return atendimentoRepositoryInstance;
}

function getStatsRepository() {
  if (!statsRepositoryInstance) {
    statsRepositoryInstance = new MockStatsRepository(
      getEncaminhamentoRepository(),
      getAtendimentoRepository()
    );
  }
  return statsRepositoryInstance;
}
