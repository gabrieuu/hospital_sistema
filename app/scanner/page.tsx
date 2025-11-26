'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/lib/components/ui/Button';

export default function ScannerPage() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  
  const handleScan = () => {
    setIsScanning(true);
    
    // Simular leitura da tag
    setTimeout(() => {
      setIsScanning(false);
      // Redirecionar para visualização do paciente
      router.push('/pacientes/1');
    }, 2000);
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
          <h1 className="text-2xl font-semibold text-[#0A3D62]">Leitura da Tag do Paciente</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center space-y-8">
          {/* Área de Leitura */}
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
            {isScanning ? (
              <div className="space-y-6">
                <div className="w-48 h-48 mx-auto relative">
                  <div className="absolute inset-0 bg-[#0A3D62] opacity-20 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-32 h-32 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                </div>
                <p className="text-xl font-medium text-[#0A3D62]">
                  Lendo tag...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-[#0A3D62] to-[#0A5D92] rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>

                <div>
                  <Button
                    onClick={handleScan}
                    variant="primary"
                    className="min-w-[200px]"
                  >
                    Ler Tag
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Texto Auxiliar */}
          {!isScanning && (
            <div className="space-y-4">
              <p className="text-gray-600 text-lg">
                Aproxime a tag da área de leitura ou escaneie o QR Code
              </p>
              
              {/* Ícones */}
              <div className="flex items-center justify-center gap-12 pt-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">NFC</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">QR Code</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
