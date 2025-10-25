import { Patient } from "@/app/lib/domain/models/Patient";
import { Hospital } from "@/app/lib/domain/models/Hospital";
import { Encaminhamento } from "@/app/lib/domain/models/Encaminhamento";
import { Atendimento } from "@/app/lib/domain/models/Atendimento";
import { User } from "@/app/lib/domain/models/User";
import { DashboardStats } from "@/app/lib/domain/models/DashboardStats";
import { EncaminhamentoStatus } from "@/app/lib/domain/enum/EncaminhamentoStatus";
import { UrgencyLevel } from "@/app/lib/domain/enum/UrgencyLevel";
import { IPatientRepository } from "@/app/lib/repositories/contracts/IPatientRepository";
import { IEncaminhamentoRepository } from "@/app/lib/repositories/contracts/IEncaminhamentoRepository";
import { IHospitalRepository } from "@/app/lib/repositories/contracts/IHospitalRepository";
import { IUserRepository } from "@/app/lib/repositories/contracts/IUserRepository";
import { IAtendimentoRepository } from "@/app/lib/repositories/contracts/IAtendimentoRepository";
import { IStatsRepository } from "@/app/lib/repositories/contracts/IStatsRepository";

const mockHospitals: Hospital[] = [
  {
    id: '1',
    nome: 'Hospital Central',
    cnpj: '12.345.678/0001-90',
    telefone: '(11) 3456-7890',
    email: 'contato@hospitalcentral.com.br',
    especialidades: ['Cardiologia', 'Neurologia', 'Ortopedia'],
    distancia: '2.5 km',
    disponivel: true,
    disponibilidade: 'Alta',
    endereco: {
      cep: '01310-100',
      rua: 'Av. Paulista',
      numero: '1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP'
    }
  },
  {
    id: '2',
    nome: 'Hospital São Lucas',
    cnpj: '98.765.432/0001-10',
    telefone: '(11) 2345-6789',
    email: 'contato@saolucas.com.br',
    especialidades: ['Pediatria', 'Ginecologia', 'Oncologia'],
    distancia: '5.8 km',
    disponivel: true,
    disponibilidade: 'Média',
    endereco: {
      cep: '04538-133',
      rua: 'Av. Brigadeiro Faria Lima',
      numero: '2000',
      bairro: 'Itaim Bibi',
      cidade: 'São Paulo',
      estado: 'SP'
    }
  },
  {
    id: '3',
    nome: 'Hospital Santa Maria',
    cnpj: '11.222.333/0001-44',
    telefone: '(11) 4567-8901',
    email: 'contato@santamaria.com.br',
    especialidades: ['Traumatologia', 'Radiologia', 'UTI'],
    distancia: '8.2 km',
    disponivel: false,
    disponibilidade: 'Baixa',
    endereco: {
      cep: '05508-000',
      rua: 'Av. Rebouças',
      numero: '3000',
      bairro: 'Pinheiros',
      cidade: 'São Paulo',
      estado: 'SP'
    }
  }
];

const mockPatients: Patient[] = [
  {
    id: '1',
    nome: 'João',
    sobrenome: 'Silva',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    cartaoSus: '123 4567 8901 2345',
    dataNascimento: '1985-05-15',
    telefone: '(11) 98765-4321',
    email: 'joao.silva@email.com',
    endereco: {
      cep: '01310-100',
      rua: 'Rua Augusta',
      numero: '100',
      complemento: 'Apto 101',
      bairro: 'Consolação',
      cidade: 'São Paulo',
      estado: 'SP'
    },
    informacoesSaude: {
      tipoSanguineo: 'O+',
      alergias: ['Penicilina'],
      medicamentosUso: ['Losartana'],
      condicoesCronicas: ['Hipertensão']
    },
    tagId: 'TAG001',
    hospitalId: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    nome: 'Maria',
    sobrenome: 'Santos',
    cpf: '987.654.321-00',
    rg: '98.765.432-1',
    cartaoSus: '987 6543 2109 8765',
    dataNascimento: '1990-08-20',
    telefone: '(11) 91234-5678',
    email: 'maria.santos@email.com',
    endereco: {
      cep: '04538-133',
      rua: 'Av. Faria Lima',
      numero: '200',
      bairro: 'Itaim Bibi',
      cidade: 'São Paulo',
      estado: 'SP'
    },
    informacoesSaude: {
      tipoSanguineo: 'A+',
      alergias: [],
      medicamentosUso: [],
      condicoesCronicas: []
    },
    tagId: 'TAG002',
    hospitalId: '1',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '3',
    nome: 'Pedro',
    sobrenome: 'Oliveira',
    cpf: '456.789.123-00',
    rg: '45.678.912-3',
    cartaoSus: '456 7891 2345 6789',
    dataNascimento: '1978-12-03',
    telefone: '(11) 99876-5432',
    email: 'pedro.oliveira@email.com',
    endereco: {
      cep: '05508-000',
      rua: 'Rua dos Pinheiros',
      numero: '300',
      bairro: 'Pinheiros',
      cidade: 'São Paulo',
      estado: 'SP'
    },
    informacoesSaude: {
      tipoSanguineo: 'B+',
      alergias: ['Dipirona'],
      medicamentosUso: ['Metformina'],
      condicoesCronicas: ['Diabetes tipo 2']
    },
    tagId: 'TAG003',
    hospitalId: '2',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05')
  }
];

const mockEncaminhamentos: Encaminhamento[] = [
  {
    id: '1',
    pacienteId: '1',
    hospitalOrigemId: '1',
    hospitalDestinoId: '2',
    tipoExame: 'Ressonância Magnética',
    urgencia: UrgencyLevel.ALTA,
    status: EncaminhamentoStatus.PENDENTE,
    observacoes: 'Paciente com suspeita de AVC',
    tempoEstimado: '2 horas',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    pacienteId: '2',
    hospitalOrigemId: '1',
    hospitalDestinoId: '3',
    tipoExame: 'Tomografia',
    urgencia: UrgencyLevel.MEDIA,
    status: EncaminhamentoStatus.ACEITO,
    observacoes: 'Acompanhamento de tratamento',
    tempoEstimado: '4 horas',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockAtendimentos: Atendimento[] = [
  {
    id: '1',
    pacienteId: '1',
    hospitalId: '1',
    tipo: 'Consulta',
    descricao: 'Consulta de rotina - Cardiologia',
    data: new Date('2024-10-20'),
    medico: 'Dr. Carlos Alberto'
  },
  {
    id: '2',
    pacienteId: '2',
    hospitalId: '1',
    tipo: 'Exame',
    descricao: 'Hemograma completo',
    data: new Date('2024-10-22'),
    medico: 'Dra. Ana Paula'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    nome: 'Admin Hospital Central',
    email: 'admin@hospitalcentral.com.br',
    hospitalId: '1',
    role: 'admin'
  }
];

export class MockPatientRepository implements IPatientRepository {
  private patients: Patient[] = [...mockPatients];

  async getAll(): Promise<Patient[]> {
    return Promise.resolve(this.patients);
  }

  async getById(id: string): Promise<Patient | null> {
    const patient = this.patients.find(p => p.id === id);
    return Promise.resolve(patient || null);
  }

  async create(patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.patients.push(newPatient);
    return Promise.resolve(newPatient);
  }

  async update(id: string, patientData: Partial<Patient>): Promise<Patient> {
    const index = this.patients.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Patient not found');
    this.patients[index] = { ...this.patients[index], ...patientData, updatedAt: new Date() };
    return Promise.resolve(this.patients[index]);
  }

  async delete(id: string): Promise<void> {
    this.patients = this.patients.filter(p => p.id !== id);
    return Promise.resolve();
  }

  async search(query: string): Promise<Patient[]> {
    const lowerQuery = query.toLowerCase();
    const results = this.patients.filter(p =>
      p.nome.toLowerCase().includes(lowerQuery) ||
      p.sobrenome.toLowerCase().includes(lowerQuery) ||
      p.cpf.includes(query) ||
      p.tagId.toLowerCase().includes(lowerQuery)
    );
    return Promise.resolve(results);
  }

  async getByTag(tagId: string): Promise<Patient | null> {
    const patient = this.patients.find(p => p.tagId === tagId);
    return Promise.resolve(patient || null);
  }
}

export class MockEncaminhamentoRepository implements IEncaminhamentoRepository {
  private encaminhamentos: Encaminhamento[] = [...mockEncaminhamentos];

  async getAll(): Promise<Encaminhamento[]> {
    return Promise.resolve(this.encaminhamentos);
  }

  async getById(id: string): Promise<Encaminhamento | null> {
    const encaminhamento = this.encaminhamentos.find(e => e.id === id);
    return Promise.resolve(encaminhamento || null);
  }

  async getByPaciente(pacienteId: string): Promise<Encaminhamento[]> {
    const results = this.encaminhamentos.filter(e => e.pacienteId === pacienteId);
    return Promise.resolve(results);
  }

  async getByHospital(hospitalId: string): Promise<Encaminhamento[]> {
    const results = this.encaminhamentos.filter(
      e => e.hospitalOrigemId === hospitalId || e.hospitalDestinoId === hospitalId
    );
    return Promise.resolve(results);
  }

  async getPendentes(): Promise<Encaminhamento[]> {
    const results = this.encaminhamentos.filter(e => e.status === EncaminhamentoStatus.PENDENTE);
    return Promise.resolve(results);
  }

  async create(encaminhamentoData: Omit<Encaminhamento, 'id' | 'createdAt' | 'updatedAt'>): Promise<Encaminhamento> {
    const newEncaminhamento: Encaminhamento = {
      ...encaminhamentoData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.encaminhamentos.push(newEncaminhamento);
    return Promise.resolve(newEncaminhamento);
  }

  async update(id: string, encaminhamentoData: Partial<Encaminhamento>): Promise<Encaminhamento> {
    const index = this.encaminhamentos.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Encaminhamento not found');
    this.encaminhamentos[index] = { ...this.encaminhamentos[index], ...encaminhamentoData, updatedAt: new Date() };
    return Promise.resolve(this.encaminhamentos[index]);
  }

  async updateStatus(id: string, status: EncaminhamentoStatus): Promise<Encaminhamento> {
    return this.update(id, { status });
  }

  async delete(id: string): Promise<void> {
    this.encaminhamentos = this.encaminhamentos.filter(e => e.id !== id);
    return Promise.resolve();
  }
}

export class MockHospitalRepository implements IHospitalRepository {
  private hospitals: Hospital[] = [...mockHospitals];

  async getAll(): Promise<Hospital[]> {
    return Promise.resolve(this.hospitals);
  }

  async getById(id: string): Promise<Hospital | null> {
    const hospital = this.hospitals.find(h => h.id === id);
    return Promise.resolve(hospital || null);
  }

  async getByEspecialidade(especialidade: string): Promise<Hospital[]> {
    const results = this.hospitals.filter(h =>
      h.especialidades.some(e => e.toLowerCase().includes(especialidade.toLowerCase()))
    );
    return Promise.resolve(results);
  }

  async search(query: string): Promise<Hospital[]> {
    const lowerQuery = query.toLowerCase();
    const results = this.hospitals.filter(h =>
      h.nome.toLowerCase().includes(lowerQuery) ||
      h.especialidades.some(e => e.toLowerCase().includes(lowerQuery))
    );
    return Promise.resolve(results);
  }
}

export class MockUserRepository implements IUserRepository {
  private users: User[] = [...mockUsers];

  async getById(id: string): Promise<User | null> {
    const user = this.users.find(u => u.id === id);
    return Promise.resolve(user || null);
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return Promise.resolve(user || null);
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const newUser: User = { ...userData, id: Date.now().toString() };
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    this.users[index] = { ...this.users[index], ...userData };
    return Promise.resolve(this.users[index]);
  }
}

export class MockAtendimentoRepository implements IAtendimentoRepository {
  private atendimentos: Atendimento[] = [...mockAtendimentos];

  async getAll(): Promise<Atendimento[]> {
    return Promise.resolve(this.atendimentos);
  }

  async getById(id: string): Promise<Atendimento | null> {
    const atendimento = this.atendimentos.find(a => a.id === id);
    return Promise.resolve(atendimento || null);
  }

  async getByPaciente(pacienteId: string): Promise<Atendimento[]> {
    const results = this.atendimentos.filter(a => a.pacienteId === pacienteId);
    return Promise.resolve(results);
  }

  async getByHospital(hospitalId: string): Promise<Atendimento[]> {
    const results = this.atendimentos.filter(a => a.hospitalId === hospitalId);
    return Promise.resolve(results);
  }

  async create(atendimentoData: Omit<Atendimento, 'id'>): Promise<Atendimento> {
    const newAtendimento: Atendimento = { ...atendimentoData, id: Date.now().toString() };
    this.atendimentos.push(newAtendimento);
    return Promise.resolve(newAtendimento);
  }

  async update(id: string, atendimentoData: Partial<Atendimento>): Promise<Atendimento> {
    const index = this.atendimentos.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Atendimento not found');
    this.atendimentos[index] = { ...this.atendimentos[index], ...atendimentoData };
    return Promise.resolve(this.atendimentos[index]);
  }
}

export class MockStatsRepository implements IStatsRepository {
  constructor(
    private encaminhamentoRepository: IEncaminhamentoRepository,
    private atendimentoRepository: IAtendimentoRepository
  ) {}

  async getDashboardStats(hospitalId: string): Promise<DashboardStats> {
    const allEncaminhamentos = await this.encaminhamentoRepository.getAll();
    const allAtendimentos = await this.atendimentoRepository.getAll();
    const encaminhamentosPendentes = allEncaminhamentos.filter(
      e => e.status === EncaminhamentoStatus.PENDENTE &&
      (e.hospitalOrigemId === hospitalId || e.hospitalDestinoId === hospitalId)
    ).length;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const atendimentosHoje = allAtendimentos.filter((a: Atendimento) => {
      const dataAtendimento = new Date(a.data);
      dataAtendimento.setHours(0, 0, 0, 0);
      return dataAtendimento.getTime() === hoje.getTime() && a.hospitalId === hospitalId;
    }).length;
    return Promise.resolve({
      pacientesHoje: atendimentosHoje,
      encaminhamentosPendentes,
      atendimentosHoje
    });
  }
}
