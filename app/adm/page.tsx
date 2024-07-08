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
              { id: '', tipo: '', caminho: '', data: '' } // Inicializando data vazia para novo conteúdo
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
    <div className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6 text-center">Cadastrar Projeto</h1>
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block mb-2 text-lg font-medium">ID:</label>
                <input
                    type="text"
                    name="id"
                    value={work.id}
                    onChange={handleChange}
                    placeholder="Escreva aqui..."
                    className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 text-lg font-medium">Tags (separadas por vírgula):</label>
                <input
                    type="text"
                    name="tag"
                    value={work.tag.join(', ')}
                    onChange={(e) => handleArrayChange(e, 'tag')}
                    placeholder="Escreva aqui..."
                    className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block mb-2 text-lg font-medium">Nome:</label>
                <input
                    type="text"
                    name="nome"
                    value={work.nome}
                    onChange={handleChange}
                    placeholder="Escreva aqui..."
                    className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 text-lg font-medium">Data:</label>
                <input
                    type="date"
                    name="data"
                    value={work.data}
                    onChange={handleChange}
                    placeholder="Escreva aqui..."
                    className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
            </div>
        </div>
        <div>
            <label className="block mb-2 text-lg font-medium">Descrição:</label>
            <textarea
                name="description"
                value={work.description}
                onChange={handleChange}
                placeholder="Escreva aqui..."
                className="w-full h-32 border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                required
            />
        </div>
        <div>
            <label className="block mb-2 text-lg font-medium">URL:</label>
            <input
                type="url"
                name="url"
                value={work.url}
                onChange={handleChange}
                placeholder="Escreva aqui..."
                className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                required
            />
        </div>
        <div>
            <label className="block mb-2 text-lg font-medium">Imagens (URLs separadas por vírgula):</label>
            <input
                type="text"
                name="imagens"
                value={work.imagens.join(', ')}
                onChange={(e) => handleArrayChange(e, 'imagens')}
                placeholder="Escreva aqui..."
                className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                required
            />
        </div>
        <div>
            <label className="block mb-2 text-lg font-medium">Categoria:</label>
            <input
                type="text"
                name="categoria"
                value={work.categoria}
                onChange={handleChange}
                placeholder="Escreva aqui..."
                className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                required
            />
        </div>
        <div>
            <h2 className="text-lg font-bold mb-2">Conteúdos</h2>
            {work.conteudos.map((conteudo, index) => (
                <div key={index} className="border border-gray-300 p-4 rounded-md mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-lg font-medium">ID:</label>
                            <input
                                type="text"
                                value={conteudo.id}
                                onChange={(e) => handleConteudoChange(index, 'id', e.target.value)}
                                placeholder="Escreva aqui..."
                                className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-lg font-medium">Tipo:</label>
                            <input
                                type="text"
                                value={conteudo.tipo}
                                onChange={(e) => handleConteudoChange(index, 'tipo', e.target.value)}
                                placeholder="Escreva aqui..."
                                className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium">Caminho:</label>
                        <input
                            type="text"
                            value={conteudo.caminho}
                            onChange={(e) => handleConteudoChange(index, 'caminho', e.target.value)}
                            placeholder="Escreva aqui..."
                            className="w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium">Upload de Arquivos:</label>
                        <input type="file" multiple onChange={handleFileChange} className="mt-1" />
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddConteudo}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                Adicionar Conteúdo
            </button>
        </div>
        <div>
            <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
            >
                Cadastrar
            </button>
        </div>
    </form>
</div>
  );
}