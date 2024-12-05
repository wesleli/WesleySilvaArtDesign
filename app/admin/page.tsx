'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import { useRouter } from "next/navigation";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";

// Carrega o ReactQuill apenas no cliente
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const cleanText = (text: string): string | null => {
  const cleaned = text.replace(/<p><br><\/p>/g, '').trim();
  return cleaned.length === 0 ? null : cleaned;
};



type Work = {
  id: string;
  tag: string[];
  nome: string;
  data: string;
  description: string;
  url: string;

  categoria: string;

  texto: string | null;
};

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [works, setWorks] = useState<Work[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newWork, setNewWork] = useState<Partial<Work>>({});
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const updateNewWorkField = (field: string, value: any) => {
    setNewWork((prevWork) => ({
      ...prevWork,
      [field]: value,
    }));
  };
  

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get('/api/fetch_api');
        setWorks(response.data.works);
      } catch (error) {
        console.error("Error fetching works:", error);
        setErrorMessage("Erro ao buscar dados dos projetos.");
      }
    };
    fetchWorks();
  }, []);

  const generateNewId = () => {
    if (works.length === 0) return "1";
    const maxId = Math.max(...works.map(work => parseInt(work.id, 10)));
    return (maxId + 1).toString();
  };

  const handleEdit = (id: string) => {
    setIsEditing(id);
    setShowModal(true);
    setNewWork(works.find(work => work.id === id) || {});
  };

  const handleSave = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("nome", newWork.nome || "");
      formData.append("data", newWork.data || "");
      formData.append("description", newWork.description || "");
      formData.append("url", newWork.url || "");
      formData.append("categoria", newWork.categoria || "");
      const cleanedText = cleanText(newWork.texto || '');
      formData.append("texto", cleanedText || '');

      if (newWork.tag) {
        formData.append("tag", JSON.stringify(newWork.tag));
      }


      const response = await axios.put(`/api/put_api/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 200) {
        setIsEditing(null);
        setShowModal(false);
        const fetchResponse = await axios.get('/api/fetch_api');
        setWorks(fetchResponse.data.works);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error saving work:", error);
      setErrorMessage("Erro ao salvar as alterações do projeto.");
    }
  };

  const handleAddNewWork = async () => {
    try {
      const formData = new FormData();
      formData.append("id", generateNewId());
      formData.append("nome", newWork.nome || "");
      formData.append("data", newWork.data || "");
      formData.append("description", newWork.description || "");
      formData.append("url", newWork.url || "");
      formData.append("categoria", newWork.categoria || "");
  
      // Limpar o texto antes de enviar
      const cleanedText = cleanText(newWork.texto || "");
      formData.append("texto", cleanedText || "");
  
      if (newWork.tag) {
        formData.append("tag", JSON.stringify(newWork.tag));
      }


  
      const response = await axios.post('/api/post_api', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        // Resetar o formulário após o sucesso
        setNewWork({});
        setShowModal(false);
  
        // Atualizar a lista de projetos
        const fetchResponse = await axios.get('/api/fetch_api');
        setWorks(fetchResponse.data.works);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error adding new work:", error);
      setErrorMessage("Erro ao adicionar novo projeto.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      <h1 className="text-2xl font-semibold mb-6">Admin Page - Manage Projects</h1>

      {errorMessage && (
        <div className="mb-4 text-red-500 bg-red-100 p-3 rounded">
          {errorMessage}
        </div>
      )}

      <button
        onClick={() => { setShowModal(true); setIsEditing(null); setNewWork({}); }}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
      >
        Adicionar Novo Projeto
      </button>

      {showModal && (
        <div className="fixed inset-0 w-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg mx-5 w-full max-w-lg space-y-4 overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{isEditing ? "Editar Projeto" : "Adicionar Projeto"}</h2>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          X
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isEditing ? handleSave(isEditing) : handleAddNewWork();
        }}
        className="space-y-3"
      >
        {/* Inputs de dados */}
        <input
          type="text"
          placeholder="Tags (separadas por vírgula)"
          value={newWork.tag?.join(', ') || ''}
          onChange={(e) => updateNewWorkField('tag', e.target.value.split(', '))}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Nome"
          value={newWork.nome || ''}
          onChange={(e) => updateNewWorkField('nome', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Data"
          value={newWork.data || ''}
          onChange={(e) => updateNewWorkField('data', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Descrição"
          value={newWork.description || ''}
          onChange={(e) => updateNewWorkField('description', e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="text"
          placeholder="URL"
          value={newWork.url || ''}
          onChange={(e) => updateNewWorkField('url', e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Categoria"
          value={newWork.categoria || ''}
          onChange={(e) => updateNewWorkField('categoria', e.target.value)}
          className="w-full p-2 border rounded"
        />
        
<ReactQuill
  value={newWork.texto || ''}
  onChange={(value) => {
    // Se o valor for vazio, definimos como null
    updateNewWorkField('texto', value.trim() === '' ? null : value);
  }}
  theme="snow"
  modules={{
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ align: [] }],
      ['link'],
      ['blockquote'],
      ['image'],
    ],
  }}
  className="mb-4 border-2 border-gray-300 rounded"
/>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition"
        >
          {isEditing ? "Salvar Alterações" : "Adicionar Projeto"}
        </button>
      </form>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white shadow rounded border">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Nome</th>
            <th className="py-2 px-4">Tags</th>
            <th className="py-2 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work) => (
            <tr key={work.id} className="text-gray-700 text-sm">
              <td className="py-2 px-4">{work.id}</td>
              <td className="py-2 px-4">{work.nome}</td>
              <td className="py-2 px-4">{work.tag.join(', ')}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(work.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



