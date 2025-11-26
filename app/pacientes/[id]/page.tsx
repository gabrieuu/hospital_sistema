'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/app/lib/components/ui/Card';
import { Button } from '@/app/lib/components/ui/Button';

// Dados mockados
const mockPaciente = {
  id: '1',
  nome: 'Maria Silva',
  sobrenome: 'Santos',
  cpf: '123.456.789-00',
  cartaoSus: '123 4567 8901 2345',
  idade: 45,
  tagId: 'TAG-2024-ABC123XYZ',
  telefone: '(11) 98765-4321',
  historico: [
    {
      id: '1',
      data: '2024-10-20',
      tipo: 'Consulta Geral',
      hospital: 'Hospital Santa Maria',
      descricao: 'Consulta de rotina'
    },
    {
      id: '2',
      data: '2024-10-15',
      tipo: 'Exame de Sangue',
      hospital: 'Hospital Santa Maria',
      descricao: 'Hemograma completo'
    }
  ],
  encaminhamentos: [
    {
      id: '1',
      tipo: 'Cardiologia',
      hospital: 'Hospital do Coração',
      urgencia: 'media' as const,
      status: 'Pendente',
      data: '2024-10-22'
    }
  ]
};

export default function PacientePage() {
  const router = useRouter();
  const params = useParams();
  const pacienteId = params.id as string;

  const getUrgencyColor = (urgencia: 'alta' | 'media' | 'baixa') => {
    return {
      alta: 'bg-red-50 border-red-200 text-red-700',
      media: 'bg-orange-50 border-orange-200 text-orange-700',
      baixa: 'bg-blue-50 border-blue-200 text-blue-700'
    }[urgencia];
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={() => {
                router.push(`/dashboard`);
              
            }}
            className="text-gray-600 hover:text-[#0A3D62] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-[#0A3D62]">
              {mockPaciente.nome} {mockPaciente.sobrenome}
            </h1>
            <p className="text-sm text-gray-600">Tag: {mockPaciente.tagId}</p>
          </div>
          <Button
            variant="primary"
            onClick={() => router.push(`/encaminhamento/novo?pacienteId=${pacienteId}`)}
          >
            Criar Encaminhamento
          </Button>   
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados Principais */}
            <Card>
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Informações do Paciente
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">CPF</p>
                  <p className="font-medium">{mockPaciente.cpf}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cartão SUS</p>
                  <p className="font-medium">{mockPaciente.cartaoSus}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Idade</p>
                  <p className="font-medium">{mockPaciente.idade} anos</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p className="font-medium">{mockPaciente.telefone}</p>
                </div>
              </div>
            </Card>

            {/* Histórico */}
            <Card>
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Histórico de Atendimentos
              </h2>
              <div className="space-y-3">
                {mockPaciente.historico.map((item) => (
                  <div key={item.id} className="border-l-4 border-[#0A3D62] pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{item.tipo}</p>
                        <p className="text-sm text-gray-600">{item.hospital}</p>
                        <p className="text-sm text-gray-500">{item.descricao}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(item.data).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            {/* Encaminhamentos Ativos */}
            <Card>
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Encaminhamentos Ativos
              </h2>
              <div className="space-y-3">
                {mockPaciente.encaminhamentos.map((enc) => (
                  <div
                    key={enc.id}
                    className={`p-3 rounded-lg border ${getUrgencyColor(enc.urgencia)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium">{enc.tipo}</p>
                      <span className="text-xs font-semibold uppercase">
                        {enc.urgencia}
                      </span>
                    </div>
                    <p className="text-sm mb-1">{enc.hospital}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{enc.status}</span>
                      <span>{new Date(enc.data).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Ações Rápidas */}
            <Card>
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Ações Rápidas
              </h2>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="text-sm font-medium">Editar dados</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">Novo atendimento</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span className="text-sm font-medium">Imprimir histórico</span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
