'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/app/lib/components/ui/Card';
import { Input } from '@/app/lib/components/ui/Input';
import { Hospital } from '@/app/lib/domain/models/Hospital';
import { Modular } from '../lib/di/service';

export default function HospitaisPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEspecialidade, setFilterEspecialidade] = useState('');
  const hospitalService = Modular.hospitalService;
  const especialidades : string[] = [];

  let hospitais : Hospital[] = [];

  const fetchHospitais = async () => {
    hospitais = await hospitalService.getAllHospitals();
  };

  useEffect(() => {
    fetchHospitais();
  }, []);

  const getDisponibilidadeColor = (disponibilidade: string) => {
    return {
      'Alta': 'text-green-600 bg-green-50',
      'Média': 'text-orange-600 bg-orange-50',
      'Baixa': 'text-red-600 bg-red-50'
    }[disponibilidade] || 'text-gray-600 bg-gray-50';
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
          <h1 className="text-2xl font-semibold text-[#0A3D62]">Hospitais Parceiros</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Filtros */}
        <div className="mb-6 space-y-4">
          <Input
            type="text"
            placeholder="Buscar hospital por nome ou especialidade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterEspecialidade('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !filterEspecialidade
                  ? 'bg-[#0A3D62] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#0A3D62]'
              }`}
            >
              Todas
            </button>
            {especialidades.map((esp) => (
              <button
                key={esp}
                onClick={() => setFilterEspecialidade(esp)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterEspecialidade === esp
                    ? 'bg-[#0A3D62] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#0A3D62]'
                }`}
              >
                {esp}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Hospitais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitais.map((hospital) => (
            <Card
              key={hospital.id}
              onClick={() => {
                // Simulação de seleção de hospital
                alert(`Hospital selecionado: ${hospital.nome}`);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                    {hospital.nome}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="text-sm font-medium text-[#0A3D62]">
                        {hospital.especialidades.join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{hospital.distancia} km • {hospital.endereco.cidade}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{hospital.telefone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getDisponibilidadeColor(hospital.disponibilidade)}`}>
                        {hospital.disponibilidade}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ícone de seta */}
                <svg className="w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          ))}
        </div>

        {hospitais.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500">Nenhum hospital encontrado</p>
          </div>
        )}
      </main>
    </div>
  );
}
