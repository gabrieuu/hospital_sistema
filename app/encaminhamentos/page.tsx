'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/app/lib/components/ui/Card';
import { Encaminhamento } from '@/app/lib/domain/models/Encaminhamento';
import { EncaminhamentoStatus } from '@/app/lib/domain/enum/EncaminhamentoStatus';
import { UrgencyLevel } from '@/app/lib/domain/enum/UrgencyLevel';
import { Modular } from '../lib/di/service';
import { useUserStore } from '../lib/stores/UserStore';

export default function EncaminhamentosPage() {
  const router = useRouter();
  const [encaminhamentos, setEncaminhamentos] = useState<Encaminhamento[]>([]);
  const [loading, setLoading] = useState(true);
  const encaminhamentoService = Modular.encaminhamentoService;
  const userStore = useUserStore();

  useEffect(() => {
    loadEncaminhamentos();
  }, []);

  async function loadEncaminhamentos() {
    try {
      const data = await encaminhamentoService.getAllEncaminhamentos(userStore.hospitalId);
      setEncaminhamentos(data);
    } catch (error) {
      console.error('Erro ao carregar encaminhamentos:', error);
    } finally {
      setLoading(false);
    }
  }

  // Calcular estatísticas
  const stats = {
    pendentes: encaminhamentos.filter(e => e.status === EncaminhamentoStatus.PENDENTE).length,
    aceitos: encaminhamentos.filter(e => e.status === EncaminhamentoStatus.ACEITO).length,
    total: encaminhamentos.length
  };

  const getUrgencyColor = (urgencia: UrgencyLevel) => {
    return {
      [UrgencyLevel.ALTA]: 'bg-red-50 border-red-200 text-red-700',
      [UrgencyLevel.MEDIA]: 'bg-orange-50 border-orange-200 text-orange-700',
      [UrgencyLevel.BAIXA]: 'bg-blue-50 border-blue-200 text-blue-700'
    }[urgencia];
  };

  const getStatusColor = (status: EncaminhamentoStatus) => {
    return {
      [EncaminhamentoStatus.PENDENTE]: 'bg-yellow-100 text-yellow-800',
      [EncaminhamentoStatus.ACEITO]: 'bg-green-100 text-green-800',
      [EncaminhamentoStatus.CONCLUIDO]: 'bg-blue-100 text-blue-800',
      [EncaminhamentoStatus.RECUSADO]: 'bg-gray-100 text-gray-800'
    }[status];
  };

  const getStatusLabel = (status: EncaminhamentoStatus) => {
    return {
      [EncaminhamentoStatus.PENDENTE]: 'Pendente',
      [EncaminhamentoStatus.ACEITO]: 'Aceito',
      [EncaminhamentoStatus.CONCLUIDO]: 'Concluído',
      [EncaminhamentoStatus.RECUSADO]: 'Recusado'
    }[status];
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-[#0A3D62] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-[#0A3D62]">Encaminhamentos</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1A]">{stats.pendentes}</p>
                <p className="text-sm text-gray-600">Pendentes</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1A]">{stats.aceitos}</p>
                <p className="text-sm text-gray-600">Aceitos</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1A1A1A]">{stats.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Lista de Encaminhamentos */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Carregando...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {encaminhamentos.map((enc) => (
              <Card key={enc.id} onClick={() => {}}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#1A1A1A]">
                        {enc.paciente?.nome} {enc.paciente?.sobrenome}
                      </h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(enc.status)}`}>
                        {getStatusLabel(enc.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Tipo</p>
                        <p className="font-medium text-[#1A1A1A]">{enc.tipoExame}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Hospital Destino</p>
                        <p className="font-medium text-[#1A1A1A]">{enc.hospitalDestino?.nome}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Data</p>
                        <p className="font-medium text-[#1A1A1A]">
                          {new Date(enc.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold uppercase ${getUrgencyColor(enc.urgencia)}`}>
                    {enc.urgencia}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
