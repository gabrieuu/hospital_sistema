import {
  MockAtendimentoRepository,
  MockEncaminhamentoRepository,
  MockHospitalRepository,
  MockPatientRepository,
  MockStatsRepository,
  MockUserRepository
} from '@/app/lib/repositories/implementations/MockRepositories';

import { AtendimentoService } from '@/app/lib/services/AtendimentoService';
import { DashboardService } from '@/app/lib/services/DashboardService';
import { EncaminhamentoService } from '@/app/lib/services/EncaminhamentoService';
import { HospitalService } from '@/app/lib/services/HospitalService';
import { PatientService } from '@/app/lib/services/PatientService';
import { UserService } from '@/app/lib/services/UserService';

// ================================================================
// SINGLETON INSTANCES (In-memory during session)
// ================================================================

let patientRepositoryInstance: MockPatientRepository | null = null;
let encaminhamentoRepositoryInstance: MockEncaminhamentoRepository | null = null;
let hospitalRepositoryInstance: MockHospitalRepository | null = null;
let userRepositoryInstance: MockUserRepository | null = null;
let atendimentoRepositoryInstance: MockAtendimentoRepository | null = null;
let statsRepositoryInstance: MockStatsRepository | null = null;

// ================================================================
// DIRECT  FOR EASY USAGE IN COMPONENTS
// ================================================================

export const Modular = {
    patientService: createPatientService(),
    encaminhamentoService: createEncaminhamentoService(),
    hospitalService: createHospitalService(),
    userService: createUserService(),
    atendimentoService: createAtendimentoService(),
    dashboardService: createDashboardService()
}

// ================================================================
// REPOSITORY GETTERS (Singletons)
// ================================================================

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

function getUserRepository() {
  if (!userRepositoryInstance) {
    userRepositoryInstance = new MockUserRepository();
  }
  return userRepositoryInstance;
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

// ================================================================
// SERVICE FACTORIES
// ================================================================

function createPatientService(): PatientService {
  return new PatientService(getPatientRepository());
}

function createEncaminhamentoService(): EncaminhamentoService {
  return new EncaminhamentoService(getEncaminhamentoRepository());
}

function createHospitalService(): HospitalService {
  return new HospitalService(getHospitalRepository());
}

function createUserService(): UserService {
  return new UserService(getUserRepository());
}

function createAtendimentoService(): AtendimentoService {
  return new AtendimentoService(getAtendimentoRepository());
}

function createDashboardService(): DashboardService {
  return new DashboardService(getStatsRepository());
}
