'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/app/lib/components/ui/Card';
import { Input } from '@/app/lib/components/ui/Input';
import PatientCardComponent from './components/PatientCardComponent';
import { usePatientStore } from '../lib/stores/PatientStore';
import { useEffect, useState } from 'react';
import { Modular } from '../lib/di/service';
import { useUserStore } from '../lib/stores/UserStore';
import { DashboardStats } from '../lib/domain/models';

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(''); 

  const [debounceSearch, setDebounceSearch] = useState('');

  const patientStore = usePatientStore();

  const userStore = useUserStore();

  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const stats = await Modular.dashboardService.getDashboardStats(userStore.hospitalId);
      setDashboardStats(stats);
    };

    fetchDashboardStats();
  }, [userStore.hospitalId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearch(searchQuery);
    }, 500)
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    patientStore.fetchPatients();
  }, []);

  useEffect(() => {
    patientStore.fetchFilteredPatients(debounceSearch);
  }, [debounceSearch]);

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#0A3D62]">
            Hospital Santa Maria
          </h1>
          <div className="flex items-center gap-4">
            {/* Notificações */}
            <button className="relative p-2 text-gray-600 hover:text-[#0A3D62] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Perfil */}
            <button
              onClick={() => router.push('/perfil')}
              className="flex items-center gap-2 p-2 text-gray-600 hover:text-[#0A3D62] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Busca */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Buscar paciente por nome, CPF ou tag"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>

        {/* Ações Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            onClick={() => router.push('/scanner')}
            className="text-center py-8 cursor-pointer"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-[#0A3D62] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Scanner de Tag</h3>
              <p className="text-sm text-gray-600">Ler tag do paciente</p>
            </div>
          </Card>

          <Card
            onClick={() => router.push('/pacientes/novo')}
            className="text-center py-8 cursor-pointer"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-[#0A3D62] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Cadastrar Paciente</h3>
              <p className="text-sm text-gray-600">Novo registro</p>
            </div>
          </Card>

          <Card
            onClick={() => router.push('/encaminhamentos')}
            className="text-center py-8 cursor-pointer"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-[#0A3D62] rounded-full flex items-center justify-center relative">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">{dashboardStats?.encaminhamentosPendentes || 0}</span>
              </div>
              <h3 className="font-semibold text-lg">Encaminhamentos</h3>
              <p className="text-sm text-gray-600">{dashboardStats?.encaminhamentosPendentes || 0} pendentes</p>
            </div>
          </Card>
        </div>

        {/* Pacientes do Dia */}
        <div>
          <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
            Pacientes do dia
          </h2>
          {
            (patientStore.filteredPatients && patientStore.filteredPatients.length > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patientStore.filteredPatients.map((paciente) => (
              <Card
                key={paciente.id}
                onClick={() => router.push(`/pacientes/${paciente.id}`)}
              >
               <PatientCardComponent paciente={paciente} />
              </Card>
            ))}
          </div>
            ) 
            : (<div className="text-center py-12 text-gray-500">
              Nenhum paciente encontrado
            </div>)
          }
        
        </div>
      </main>
    </div>
  );
}
