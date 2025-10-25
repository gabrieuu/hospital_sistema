# Arquitetura do Sistema - Camadas de Dados

## 📐 Visão Geral da Arquitetura

O sistema segue uma arquitetura em camadas baseada em **Repository Pattern** e **Service Layer**, facilitando manutenção, testes e troca de implementações (Mock, API REST, GraphQL, etc.).

```
┌─────────────────────────────────────────────────────────┐
│                    COMPONENTES (UI)                      │
│                  (app/*, components/*)                   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ usa
                       ↓
┌─────────────────────────────────────────────────────────┐
│                 CAMADA DE SERVIÇOS                       │
│                   (services/*)                           │
│  • PatientService                                        │
│  • EncaminhamentoService                                 │
│  • HospitalService                                       │
│  • UserService                                           │
│  • DashboardService                                      │
│                                                          │
│  Contém: Business Logic, Validações, Orquestração       │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ implementa
                       ↓
┌─────────────────────────────────────────────────────────┐
│              CONTRATOS (INTERFACES)                      │
│         (repositories/contracts/*)                       │
│  • IPatientRepository                                    │
│  • IEncaminhamentoRepository                             │
│  • IHospitalRepository                                   │
│  • IUserRepository                                       │
│  • IStatsRepository                                      │
│                                                          │
│  Define: Assinaturas dos métodos                        │
└──────────────────────┬──────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
          ↓                         ↓
┌──────────────────┐      ┌──────────────────┐
│   MOCK REPOS     │      │   API REPOS      │
│ (implementations │      │ (implementations │
│   /Mock*)        │      │   /Api*)         │
│                  │      │                  │
│ Dados em memória │      │ Fetch API REST   │
└──────────────────┘      └──────────────────┘
```

## 🗂️ Estrutura de Pastas

```
/repositories
  /contracts
    IRepositories.ts          # Interfaces (contratos)
  /implementations
    MockRepositories.ts       # Implementação Mock (dados em memória)
    ApiRepositories.ts        # Implementação API REST (exemplo)

/services
  index.ts                    # Classes de serviço (business logic)

/lib
  services.ts                 # Configuração e DI (Dependency Injection)
```

## 🔧 Como Usar nos Componentes

### Exemplo básico:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { patientService } from '@/lib/services';
import type { Patient } from '@/types';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      const data = await patientService.getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(patientData) {
    try {
      await patientService.createPatient(patientData);
      await loadPatients(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
    }
  }

  // ... render
}
```

## 🔄 Trocar Entre Mock e API

### Opção 1: Editar `lib/services.ts`

```typescript
// ANTES (Mock)
import {
  MockPatientRepository,
  // ...
} from '@/repositories/implementations/MockRepositories';

// DEPOIS (API)
import {
  ApiPatientRepository,
  // ...
} from '@/repositories/implementations/ApiRepositories';

// Atualizar as funções factory
function getPatientRepository() {
  if (!patientRepositoryInstance) {
    patientRepositoryInstance = new ApiPatientRepository(); // ← Mudança aqui
  }
  return patientRepositoryInstance;
}
```

### Opção 2: Usar Variável de Ambiente

```typescript
// lib/services.ts
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

function getPatientRepository() {
  if (!patientRepositoryInstance) {
    patientRepositoryInstance = USE_MOCK 
      ? new MockPatientRepository()
      : new ApiPatientRepository();
  }
  return patientRepositoryInstance;
}
```

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=https://api.hospital.com
```

## 📋 Serviços Disponíveis

### PatientService
```typescript
- getAllPatients()
- getPatientById(id)
- createPatient(data)
- updatePatient(id, data)
- deletePatient(id)
- searchPatients(query)
- getPatientByTag(tagId)
```

### EncaminhamentoService
```typescript
- getAllEncaminhamentos()
- getEncaminhamentoById(id)
- getEncaminhamentosByPaciente(pacienteId)
- getEncaminhamentosByHospital(hospitalId)
- getPendingEncaminhamentos()
- createEncaminhamento(data)
- updateEncaminhamentoStatus(id, status)
- deleteEncaminhamento(id)
```

### HospitalService
```typescript
- getAllHospitals()
- getHospitalById(id)
- getHospitalsByEspecialidade(especialidade)
- searchHospitals(query)
- createHospital(data)
- updateHospital(id, data)
- deleteHospital(id)
```

### UserService
```typescript
- getUserById(id)
- getUserByEmail(email)
- authenticate(email, password)
- createUser(data)
- updateUser(id, data)
- deleteUser(id)
```

### DashboardService
```typescript
- getDashboardStats(hospitalId)
```

## 🎯 Benefícios da Arquitetura

### ✅ Separação de Responsabilidades
- **UI**: Apenas apresentação e interação
- **Services**: Lógica de negócio, validações, orquestração
- **Repositories**: Acesso a dados (abstração da fonte)

### ✅ Facilidade de Manutenção
- Mudanças na API não afetam a lógica de negócio
- Mudanças na lógica não afetam a camada de dados
- Testes unitários facilitados

### ✅ Flexibilidade
- Trocar de Mock para API em minutos
- Adicionar cache facilmente
- Implementar diferentes fontes de dados (REST, GraphQL, Firebase, etc.)

### ✅ Testabilidade
```typescript
// Fácil mockar para testes
const mockRepo = {
  getAll: jest.fn().mockResolvedValue([])
};
const service = new PatientService(mockRepo);
```

### ✅ Type Safety
- TypeScript garante contratos respeitados
- Autocomplete em toda a aplicação
- Erros detectados em compile-time

## 🚀 Próximos Passos

1. **Implementar API Real**: Quando backend estiver pronto, usar `ApiRepositories`
2. **Adicionar Cache**: Implementar camada de cache nos repositórios
3. **Error Handling**: Adicionar tratamento de erros centralizado
4. **Loading States**: Gerenciar estados de carregamento
5. **Optimistic Updates**: Melhorar UX com atualizações otimistas
6. **Offline Support**: Adicionar suporte offline com sync
