'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/app/lib/components/ui/Input';
import { Button } from '@/app/lib/components/ui/Button';
import { Card } from '@/app/lib/components/ui/Card';
import { Modal } from '@/app/lib/components/ui/Modal';

export default function NovoPacientePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [tagId, setTagId] = useState('');
  
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    rg: '',
    cartaoSus: '',
    cidade: '',
    estado: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    alergias: '',
    comorbidades: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gerar tag única
    const newTagId = `TAG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setTagId(newTagId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/dashboard');
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
          <h1 className="text-2xl font-semibold text-[#0A3D62]">Novo Paciente</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <Card>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <span className="text-xl">📌</span>
              Dados pessoais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <Input
                label="Sobrenome"
                name="sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                required
              />
              <Input
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                required
              />
              <Input
                label="RG"
                name="rg"
                value={formData.rg}
                onChange={handleChange}
                required
              />
              <Input
                label="Cartão SUS"
                name="cartaoSus"
                value={formData.cartaoSus}
                onChange={handleChange}
                className="md:col-span-2"
                required
              />
            </div>
          </Card>

          {/* Endereço */}
          <Card>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <span className="text-xl">🏠</span>
              Endereço
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="CEP"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="00000-000"
                required
              />
              <Input
                label="Cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
              <Input
                label="Estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                placeholder="SP"
                required
              />
              <Input
                label="Rua"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                required
              />
              <Input
                label="Número"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
              />
              <Input
                label="Complemento"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
              />
            </div>
          </Card>

          {/* Informações de Saúde */}
          <Card>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <span className="text-xl">🧬</span>
              Informações de saúde
              <span className="text-sm font-normal text-gray-500">(opcional)</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alergias
                </label>
                <textarea
                  name="alergias"
                  value={formData.alergias}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent"
                  rows={3}
                  placeholder="Descreva as alergias conhecidas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comorbidades
                </label>
                <textarea
                  name="comorbidades"
                  value={formData.comorbidades}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent"
                  rows={3}
                  placeholder="Descreva as condições médicas existentes"
                />
              </div>
            </div>
          </Card>

          {/* Botões */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Salvar Paciente
            </Button>
          </div>
        </form>
      </main>

      {/* Modal de Tag Gerada */}
      <Modal isOpen={showModal} onClose={handleCloseModal} title="Paciente Cadastrado com Sucesso!">
        <div className="text-center space-y-6">
          <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <svg className="w-24 h-24 mx-auto text-[#0A3D62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              <p className="text-sm text-gray-500 mt-2">QR Code</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Tag ID do Paciente:</p>
            <p className="font-mono text-lg font-semibold text-[#0A3D62] bg-gray-100 px-4 py-2 rounded">
              {tagId}
            </p>
          </div>

          <p className="text-sm text-gray-600">
            Esta tag pode ser escaneada via NFC ou QR Code para acesso rápido aos dados do paciente.
          </p>

          <Button variant="primary" onClick={handleCloseModal} className="w-full">
            Concluir
          </Button>
        </div>
      </Modal>
    </div>
  );
}
