'use client'

import { useEffect, useState } from 'react';
import ConverterImagensParaConteudos from '../components/converterimagensparaconteudos';

type Conteudo = {
    tipo: string;
    caminho: string;
};

type Work = {
    id: string;
    categoria: string;
    nome: string;
    data: string;
    description: string;
    tag: string[];
    url: string;
    imagens: string[]; // Coluna imagens do SQL
    conteudos: Conteudo[]; // Conteúdos convertidos
};

const ConverterConteudosPage: React.FC = () => {
    const [sucesso, setSucesso] = useState<boolean | null>(null);
    const [works, setWorks] = useState<Work[] | null>(null);

    useEffect(() => {
        fetchWorksFromAPI();
    }, []);

    const fetchWorksFromAPI = async () => {
        try {
            const response = await fetch('/api/fetch_api');
            if (response.ok) {
                const data = await response.json();
                setWorks(data.works);
            } else {
                console.error('Erro ao buscar dados da API:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const handleConversaoCompleta = (sucesso: boolean) => {
        setSucesso(sucesso);
        fetchWorksFromAPI();
    };

    const handleUpdateTable = () => {
        setTimeout(() => {
            console.log('Tabela atualizada!');
        }, 2000);
        console.log('Tabela atualizada!');
    };

    return (
        <div className="text-black p-4">
            <h1 className="text-3xl font-bold mb-4">Converter Conteúdos</h1>
            <ConverterImagensParaConteudos
                work={works}
                onConversaoCompleta={handleConversaoCompleta}
                onUpdateTable={handleUpdateTable}
            />
            {works && works.map(work => (
                <div key={work.id} className="border p-4 mb-4">
                    <h2 className="text-xl font-bold">Dados do Trabalho:</h2>
                    <p><span className="font-semibold">ID:</span> {work.id}</p>
                    <p><span className="font-semibold">Categoria:</span> {work.categoria}</p>
                    <p><span className="font-semibold">Nome:</span> {work.nome}</p>
                    <p><span className="font-semibold">Data:</span> {work.data}</p>
                    <p><span className="font-semibold">Description:</span> {work.description}</p>
                    <p><span className="font-semibold">URL:</span> {work.url}</p>
                    <p className="font-semibold">Imagens:</p>
                    <ul className="list-disc pl-4">
                        {work.imagens.map((imagem, index) => (
                            <li key={index}>{imagem}</li>
                        ))}
                    </ul>
                    {work.conteudos && work.conteudos.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold mt-4">Tabela de Conteúdos:</h3>
                            <table className="w-full mt-2">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2">Tipo</th>
                                        <th className="py-2">Caminho</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {work.conteudos.map((conteudo, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-2">{conteudo.tipo}</td>
                                            <td className="py-2">{conteudo.caminho}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ConverterConteudosPage;