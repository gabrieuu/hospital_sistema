export interface Hospital {
  id: string;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  especialidades: string[];
  distancia?: string;
  disponivel: boolean;
  disponibilidade: string;
  
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
}
