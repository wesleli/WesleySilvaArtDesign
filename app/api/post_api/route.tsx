import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Define o tipo para a estrutura de dados do trabalho
type Work = {
    id: string;
    tag: string[];
    nome: string;
    data: string;
    description: string;
    url: string;
    imagens: string[];
    categoria: string;
};

// Função para lidar com requisições POST
export async function POST(req: NextRequest, res: NextResponse) {
    console.log("Recebendo requisição POST...");

    try {
        // Extrai os dados da requisição POST
        const data = await req.json();

        // Verifica se os dados estão presentes e têm o formato esperado
        if (!data || typeof data !== 'object') {
            console.error('Dados inválidos:', data);
            return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 });
        }

        // Insere os dados na tabela 'works'
        const result = await sql`
            INSERT INTO works (id, tag, nome, data, description, url, imagens, categoria)
            VALUES (
                ${data.id},
                ${data.tag || []},
                ${data.nome || ''},
                ${data.data || ''},
                ${data.description || ''},
                ${data.url || ''},
                ${data.imagens || []},
                ${data.categoria || ''}
            );
        `;

        console.log("Dados inseridos com sucesso:", data);

        // Retorna uma resposta de sucesso
        console.log("Requisição POST processada com sucesso. Retornando resposta.");
        return NextResponse.json({ message: "Dados inseridos com sucesso na tabela 'works'!" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao inserir dados na tabela 'works':", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}