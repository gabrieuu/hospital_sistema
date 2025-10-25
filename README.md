# Sistema Hospitalar Integrado

Sistema interligado entre hospitais com acesso restrito para gerenciamento de pacientes e encaminhamentos.

## 🎨 Design System

- **Cores Primárias:**
  - Azul: `#0A3D62`
  - Fundo: `#F5F6FA`
  - Texto: `#1A1A1A`

- **Cores de Status:**
  - Alta urgência: Vermelho `#EF4444`
  - Média urgência: Laranja `#F59E0B`
  - Baixa urgência: Azul `#3B82F6`

- **Tipografia:** Inter (clean, altamente legível)

## 📱 Telas Implementadas

### ✅ 1. Tela de Login (`/login`)
- Card central com logo do sistema
- Campos: Email e Senha (com ícone mostrar/ocultar)
- Link "Esqueci minha senha"
- Rodapé informativo

### ✅ 2. Dashboard (`/dashboard`)
- Header com nome do hospital, notificações e perfil
- Busca de pacientes por nome, CPF ou tag
- Ações principais em cards:
  - Scanner de Tag
  - Cadastrar Paciente
  - Encaminhamentos Pendentes
- Lista de pacientes do dia com status

### ✅ 3. Cadastro de Paciente (`/pacientes/novo`)
- Formulário organizado em blocos:
  - 📌 Dados pessoais (Nome, CPF, RG, Cartão SUS)
  - 🏠 Endereço completo
  - �� Informações de saúde (opcional)
- Modal com QR Code/Tag gerada após salvar

### ✅ 4. Scanner de Tag (`/scanner`)
- Interface minimalista
- Botão grande "Ler Tag"
- Indicadores visuais para NFC e QR Code
- Animação durante leitura

### ✅ 5. Visualização do Paciente (`/pacientes/[id]`)
- Cabeçalho com nome e tag do paciente
- Card com dados principais (CPF, SUS, Idade, Contato)
- Histórico de atendimentos
- Encaminhamentos ativos com código de cores por urgência
- Botão de criar novo encaminhamento

### ✅ 6. Novo Encaminhamento (`/encaminhamento/novo`)
- Seleção do tipo de exame/procedimento com busca
- Botões de urgência (Alta/Média/Baixa) com indicador visual
- Tempo estimado de atendimento
- Lista de hospitais parceiros com distância e especialidade

### ✅ 7. Lista de Hospitais Parceiros (`/hospitais`)
- Cards informativos com:
  - Nome e especialidade
  - Distância
  - Disponibilidade
  - Telefone
- Filtros por especialidade
- Busca por nome

### ✅ 8. Perfil e Configurações (`/perfil`)
- Informações do usuário
- Configurações de notificações
- Opção de tema escuro (MVP)
- Botão de sair destacado

### ✅ 9. Lista de Encaminhamentos (`/encaminhamentos`)
- Estatísticas (pendentes, aceitos, total)
- Lista completa com status e urgência
- Filtros e organização

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🗂️ Estrutura de Pastas

```
app/
├── login/              # Tela de login
├── dashboard/          # Dashboard principal
├── pacientes/
│   ├── novo/          # Cadastro de paciente
│   └── [id]/          # Visualização do paciente
├── scanner/           # Scanner de tag
├── encaminhamento/
│   └── novo/          # Novo encaminhamento
├── encaminhamentos/   # Lista de encaminhamentos
├── hospitais/         # Lista de hospitais parceiros
└── perfil/            # Configurações e perfil

components/
└── ui/                # Componentes reutilizáveis
    ├── Button.tsx
    ├── Input.tsx
    ├── Card.tsx
    └── Modal.tsx

types/
└── index.ts           # Tipos TypeScript
```

## 🎯 Experiência do Usuário (UX)

- ✅ Menos campos → menos erros → atendimento mais rápido
- ✅ Tudo acessível em no máximo 3 interações
- ✅ Foco em reduzir repetição de dados
- ✅ Elementos intuitivos: ícones, breadcrumbs, botões de fácil toque
- ✅ Feedback visual mínimo e direto (sucesso, carregando, erro)

## 📱 Responsivo

O sistema é totalmente responsivo e funciona em:
- 💻 Desktop
- 📱 Mobile
- 📋 Tablet

## 🔒 Segurança

- Sistema de autenticação (simulado no MVP)
- Acesso restrito entre hospitais
- Dados sensíveis protegidos

## 🛠️ Tecnologias

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Componentes UI customizados**

## �� Próximos Passos

- [ ] Integração com backend real
- [ ] Autenticação JWT
- [ ] Banco de dados PostgreSQL
- [ ] API de encaminhamentos
- [ ] Notificações em tempo real
- [ ] Impressão de relatórios
- [ ] Sistema de permissões por role
- [ ] Tema escuro completo

---

**Sistema interligado entre hospitais — acesso restrito.**
