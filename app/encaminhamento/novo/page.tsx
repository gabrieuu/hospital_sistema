'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/app/lib/components/ui/Button';
import { Card } from '@/app/lib/components/ui/Card';
import { Input } from '@/app/lib/components/ui/Input';
import { TipoExame } from '@/app/lib/domain/enum/tipos_exames';
import { Modular } from '@/app/lib/di/service';
import { Hospital } from '@/app/lib/domain/models';

type UrgencyLevel = 'alta' | 'media' | 'baixa';

export default function NovoEncaminhamentoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pacienteId = searchParams.get('pacienteId');
  
  const [tipoExame, setTipoExame] = useState('');
  const [urgencia, setUrgencia] = useState<UrgencyLevel>('media');
  const [hospitalSelecionado, setHospitalSelecionado] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const hospitalService = Modular.hospitalService;

  const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const [hospitaisParceiros, setHospitaisParceiros] = useState<Hospital[]>([]);

  useEffect(() => {
    const fetchHospitais = async () => {
      const allHospitais = await hospitalService.getAllHospitals();
      setHospitais(allHospitais);
      setHospitaisParceiros(allHospitais.slice());
    };
    fetchHospitais();
  }, []);

  useEffect(() => {
     const hospitaisFiltrados = hospitais.filter(hospital =>
      //espec.nome é um enum de TipoExame
      hospital.tipos_exames.some(espec => 
          espec.nome.toLowerCase().includes(tipoExame.toLowerCase())        
        )
      );
    setHospitaisParceiros(hospitaisFiltrados.slice());
  }, [tipoExame]);

  const filteredTipos = Object.values(TipoExame).filter(tipo =>
    tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de envio
    alert('Encaminhamento criado com sucesso!');
    // Volta para a página do paciente se vier de lá, senão vai pro dashboard
    if (pacienteId) {
      router.push(`/pacientes/${pacienteId}`);
    } else {
      router.push('/dashboard');
    }
  };

  const handleVoltar = () => {
    if (pacienteId) {
      router.push(`/pacientes/${pacienteId}`);
    } else {
      router.push('/dashboard');
    }
  };

  const getUrgencyStyle = (level: UrgencyLevel) => {
    const isSelected = urgencia === level;
    const styles = {
      alta: isSelected 
        ? 'bg-red-500 text-white border-red-500' 
        : 'bg-white text-red-500 border-red-300 hover:bg-red-50',
      media: isSelected
        ? 'bg-orange-500 text-white border-orange-500'
        : 'bg-white text-orange-500 border-orange-300 hover:bg-orange-50',
      baixa: isSelected
        ? 'bg-blue-500 text-white border-blue-500'
        : 'bg-white text-blue-500 border-blue-300 hover:bg-blue-50'
    };
    return styles[level];
  };

  const tempoEstimado = urgencia === 'alta' ? '24 horas' : urgencia === 'media' ? '3-5 dias' : '7-10 dias';

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={handleVoltar}
            className="text-gray-600 hover:text-[#0A3D62] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-[#0A3D62]">Novo Encaminhamento</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo do Exame/Procedimento */}
          <Card>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
              Tipo do Exame/Procedimento
            </h2>
            <Input
              type="text"
              placeholder="Digite para buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            <div className="mt-3 max-h-60 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {filteredTipos.map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => {
                      setTipoExame(tipo);
                    }}
                    className={`px-4 py-2 rounded-lg border transition-colors text-left ${
                      tipoExame === tipo
                        ? 'bg-[#0A3D62] text-white border-[#0A3D62]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#0A3D62]'
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Nível de Urgência */}
          <Card>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
              Nível de Urgência
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setUrgencia('baixa')}
                className={`px-6 py-4 rounded-lg border-2 transition-all font-medium ${getUrgencyStyle('baixa')}`}
              >
                <div className="text-center">
                  <p className="text-lg font-semibold">Baixa</p>
                  <p className="text-xs mt-1 opacity-80">Não urgente</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUrgencia('media')}
                className={`px-6 py-4 rounded-lg border-2 transition-all font-medium ${getUrgencyStyle('media')}`}
              >
                <div className="text-center">
                  <p className="text-lg font-semibold">Média</p>
                  <p className="text-xs mt-1 opacity-80">Moderada</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUrgencia('alta')}
                className={`px-6 py-4 rounded-lg border-2 transition-all font-medium ${getUrgencyStyle('alta')}`}
              >
                <div className="text-center">
                  <p className="text-lg font-semibold">Alta</p>
                  <p className="text-xs mt-1 opacity-80">Urgente</p>
                </div>
              </button>
            </div>
            
            {/* Tempo Estimado */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700">
                Tempo estimado de atendimento: <strong>{tempoEstimado}</strong>
              </span>
            </div>
          </Card>

          {/* Seleção do Hospital */}
          <Card>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
              Hospital Parceiro
            </h2>
            <div className="space-y-3">
              
              {hospitaisParceiros.length === 0 && (
                <p className="text-gray-500">Nenhum hospital disponível para o tipo de exame selecionado.</p>
              )}
              
              {hospitaisParceiros.map((hospital) => (
                <div
                  key={hospital.id}
                  onClick={() => setHospitalSelecionado(hospital.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    hospitalSelecionado === hospital.id
                      ? 'border-[#0A3D62] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1A1A1A]">{hospital.nome}</h3>
                      <p className="text-sm text-gray-600 mt-1">{hospital.especialidades.join(', ')}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {hospital.distancia} km
                        </span>
                        <span className="text-xs text-green-600 font-medium">
                          {hospital.disponibilidade}
                        </span>
                      </div>
                    </div>
                    {hospitalSelecionado === hospital.id && (
                      <svg className="w-6 h-6 text-[#0A3D62]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Observações */}
          <Card>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
              Observações (opcional)
            </h2>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent"
              rows={4}
              placeholder="Informações adicionais sobre o encaminhamento..."
            />
          </Card>

          {/* Botões */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!tipoExame || !hospitalSelecionado}
            >
              Confirmar Encaminhamento
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
