'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/app/lib/components/ui/Card';
import { Button } from '@/app/lib/components/ui/Button';
import { Modular } from '../lib/di/service';
import { useUserStore } from '../lib/stores/UserStore';

export default function PerfilPage() {
  const router = useRouter();
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [temaEscuro, setTemaEscuro] = useState(false);
  const userStore = useUserStore();
  const authService = Modular.authService;

  const handleLogout = async () => {
    if (confirm('Deseja realmente sair do sistema?')) {
      await authService.logout();
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-[#0A3D62] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-[#0A3D62]">Configurações</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Informações do Usuário */}
          <Card>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0A3D62] to-[#0A5D92] rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {userStore.user?.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#1A1A1A]">
                  {userStore.user?.nome}
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                <svg className="w-5 h-5 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-[#1A1A1A]">{userStore.user!.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                <svg className="w-5 h-5 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Hospital</p>
                  <p className="font-medium text-[#1A1A1A]">{userStore.hospital}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Configurações */}
          <Card>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
              Preferências
            </h2>
            
            <div className="space-y-4">
              {/* Notificações */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Notificações</p>
                    <p className="text-sm text-gray-600">Receber alertas do sistema</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotificacoesAtivas(!notificacoesAtivas)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificacoesAtivas ? 'bg-[#0A3D62]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificacoesAtivas ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Tema */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Tema Escuro</p>
                    <p className="text-sm text-gray-600">Opcional no MVP</p>
                  </div>
                </div>
                <button
                  onClick={() => setTemaEscuro(!temaEscuro)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    temaEscuro ? 'bg-[#0A3D62]' : 'bg-gray-300'
                  }`}
                  disabled
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      temaEscuro ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>

          {/* Ações */}
          <Card>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
              Ações
            </h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
                <svg className="w-5 h-5 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span className="text-[#1A1A1A] font-medium">Alterar senha</span>
              </button>
              
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
                <svg className="w-5 h-5 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[#1A1A1A] font-medium">Ajuda e suporte</span>
              </button>
            </div>
          </Card>

          {/* Botão Sair */}
          <Card className="border-red-200 bg-red-50">
            <Button
              variant="danger"
              className="w-full"
              onClick={handleLogout}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sair do Sistema</span>
              </div>
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
