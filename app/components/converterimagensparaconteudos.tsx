import React from 'react';

type Work = {
  id: string;
  categoria: string;
  nome: string;
  data: string;
  description: string;
  tag: string[];
  url: string;
  imagens: string[]; // Coluna imagens do SQL
};

type Conteudo = {
  id: string; // Novo campo para armazenar o ID do trabalho
  tipo: 'imagem';
  caminho: string;
};

type Props = {
  work: Work | Work[] | null; // Alterado para aceitar um trabalho ou uma lista de trabalhos
  onConversaoCompleta: (sucesso: boolean) => void;
  onUpdateTable: () => void; // Função para atualizar a tabela
};

const ConverterImagensParaConteudos: React.FC<Props> = ({ work, onConversaoCompleta, onUpdateTable }) => {
  
  const handleSubmit = async () => {
  if (!work) return;

  const conteudosConvertidos: Conteudo[] = [];

  if (Array.isArray(work)) {
    work.forEach((w) => {
      if (w.imagens && w.imagens.length > 0) {
        w.imagens.forEach((imagem) => {
          conteudosConvertidos.push({
            id: w.id,
            tipo: 'imagem',
            caminho: `/imagens/db/${w.categoria}/${w.url}/${imagem}.png`,
          });
        });
      }
    });
  } else {
    if (work.imagens && work.imagens.length > 0) {
      work.imagens.forEach((imagem) => {
        conteudosConvertidos.push({
          id: work.id,
          tipo: 'imagem',
          caminho: `/imagens/db/${work.categoria}/${work.url}/${imagem}.png`,
        });
      });
    }
  }

  if (conteudosConvertidos.length > 0) {
    try {
      const response = await fetch('/api/post_api', {
        method: 'POST',
        body: JSON.stringify(conteudosConvertidos), // Correção aqui
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Conteúdos recebidos:', responseData);
        onUpdateTable();
        onConversaoCompleta?.(true);
      } else {
        console.error('Erro ao enviar conteúdos para a API:', response.status);
        onConversaoCompleta?.(false);
      }
    } catch (error) {
      console.error('Erro ao enviar conteúdos para a API:', error);
      onConversaoCompleta?.(false);
    }
  } else {
    console.error('Nenhum conteúdo para enviar para a API');
  }
};

  

  return (
    <button onClick={handleSubmit} disabled={!work}>
      Converter Imagens para Conteúdos e Atualizar Tabela
    </button>
  );
};

export default ConverterImagensParaConteudos;