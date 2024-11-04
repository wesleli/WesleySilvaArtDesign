"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type Conteudo = {
  id: string;
  tipo: string;
  caminho: string;
};

type Work = {
  id: string;
  tag: string[];
  nome: string;
  data: string;
  description: string;
  url: string;
  imagens: string[];
  categoria: string;
  conteudos: Conteudo[];
};

export default function CadastrarProjeto() {
  const [work, setWork] = useState<Work>({
      id: '',
      tag: [],
      nome: '',
      data: '',
      description: '',
      url: '',
      imagens: [],
      categoria: '',
      conteudos: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setWork(prevState => ({
          ...prevState,
          [name]: value,
      }));
  };

  const handleArrayChange = (e: ChangeEvent<HTMLInputElement>, field: keyof Work) => {
      const { value } = e.target;
      setWork(prevState => ({
          ...prevState,
          [field]: value.split(',').map(item => item.trim()),
      }));
  };

  const handleConteudoChange = (index: number, field: keyof Conteudo, value: string) => {
      setWork(prevState => {
          const updatedConteudos = [...prevState.conteudos];
          updatedConteudos[index] = {
              ...updatedConteudos[index],
              [field]: value,
          };
          return {
              ...prevState,
              conteudos: updatedConteudos,
          };
      });
  };

  const handleAddConteudo = () => {
      setWork(prevState => ({
          ...prevState,
          conteudos: [
              ...prevState.conteudos,
              { id: '', tipo: '', caminho: '' } // Inicializando data vazia para novo conteúdo
          ]
      }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
          const fileArray = Array.from(files);
          const formData = new FormData();
          fileArray.forEach(file => {
              formData.append('arquivos', file);
          });
          // Enviar os arquivos para a API
          enviarArquivos(formData);
      }
  };

  const enviarArquivos = async (formData: FormData) => {
      try {
          const response = await fetch('/api/post_api', {
              method: 'POST',
              body: formData,
          });
          if (response.ok) {
              const data = await response.json();
              const caminhos = data.caminhos; // Receber caminhos de retorno da API
              setWork(prevState => ({
                  ...prevState,
                  imagens: caminhos, // Atualizar imagens com os caminhos recebidos
              }));
          } else {
              console.error('Erro ao enviar arquivos:', response.statusText);
          }
      } catch (error) {
          console.error('Erro ao enviar arquivos:', error);
      }
  };

  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      try {
          const response = await fetch('/api/post_api', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(work),
          });

          if (response.ok) {
              alert('Projeto cadastrado com sucesso!');
              // Redirecionar ou limpar formulário após sucesso
          } else {
              const errorData = await response.json();
              alert(`Erro ao cadastrar projeto: ${errorData.error}`);
          }
      } catch (error) {
          console.error('Erro ao enviar dados:', error);
          alert('Erro ao cadastrar projeto. Consulte o console para mais informações.');
      }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-8 text-center text-gray-800">Cadastrar Projeto</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">ID:</label>
            <input
              type="text"
              name="id"
              value={work.id}
              onChange={handleChange}
              placeholder="Digite o ID"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring focus:border-gray-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Tags (separadas por vírgula):</label>
            <input
              type="text"
              name="tag"
              value={work.tag.join(', ')}
              onChange={(e) => handleArrayChange(e, 'tag')}
              placeholder="Ex: arte, design, web"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring focus:border-gray-500"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Nome do Projeto:</label>
          <input
            type="text"
            name="nome"
            value={work.nome}
            onChange={handleChange}
            placeholder="Digite o nome do projeto"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring focus:border-gray-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Data:</label>
            <input
              type="date"
              name="data"
              value={work.data}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring focus:border-gray-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">URL:</label>
            <input
              type="url"
              name="url"
              value={work.url}
              onChange={handleChange}
              placeholder="Nome da pasta do projeto"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring focus:border-gray-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Descrição:</label>
          <textarea
            name="description"
            value={work.description}
            onChange={handleChange}
            placeholder="Descreva o projeto"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring focus:border-gray-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Categoria:</label>
          <input
            type="text"
            name="categoria"
            value={work.categoria}
            onChange={handleChange}
            placeholder="Categoria do projeto"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring focus:border-gray-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Imagens (URLs separadas por vírgula):</label>
          <input
            type="text"
            name="imagens"
            value={work.imagens.join(', ')}
            onChange={(e) => handleArrayChange(e, 'imagens')}
            placeholder="Digite URLs das imagens"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring focus:border-gray-500"
            required
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">Conteúdos Adicionais</h2>
          {work.conteudos.map((conteudo, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md mb-4">
              <input
                type="text"
                value={conteudo.id}
                onChange={(e) => handleConteudoChange(index, 'id', e.target.value)}
                placeholder="ID"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-4 text-gray-700 focus:ring focus:border-gray-500"
                required
              />
              <input
                type="text"
                value={conteudo.tipo}
                onChange={(e) => handleConteudoChange(index, 'tipo', e.target.value)}
                placeholder="Tipo"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-4 text-gray-700 focus:ring focus:border-gray-500"
                required
              />
              <input
                type="text"
                value={conteudo.caminho}
                onChange={(e) => handleConteudoChange(index, 'caminho', e.target.value)}
                placeholder="Caminho"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-gray-700 focus:ring focus:border-gray-500"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddConteudo}
            className="w-full text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2"
          >
            Adicionar Conteúdo
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-md"
        >
          Cadastrar Projeto
        </button>
      </form>
    </div>
  );
}