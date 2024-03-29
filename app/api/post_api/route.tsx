import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";


type Conteudo = {
    id: string;
    tipo: string;
    caminho: string;
};
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
    conteudos: Conteudo[]; 
};

// Função para lidar com requisições POST
export async function POST(req: NextRequest,res: NextResponse){
    console.log("Recebendo requisição POST...");

    try {
        // Extrai os dados da requisição POST
        const data: Work = await req.json();

        // Verifica se os dados estão presentes e têm o formato esperado
        if (!data || typeof data !== 'object') {
            console.error('Dados inválidos:', data);
            return NextResponse.json({ error: 'Dados inválidos. O corpo da requisição deve ser um objeto JSON.' }, { status: 400 });
        }

        // Insere os dados na tabela 'works'
        const result = await sql`
            INSERT INTO works (id, tag, nome, data, description, url, imagens, categoria, conteudos)
            VALUES (
                ${data.id},
                ${JSON.stringify(data.tag)},
                ${data.nome},
                ${data.data},
                ${data.description},
                ${data.url},
                ${JSON.stringify(data.imagens)},
                ${data.categoria},
                ${JSON.stringify(data.conteudos)}
            );
        `;

        console.log("Dados inseridos com sucesso:", data);

        // Retorna uma resposta de sucesso
        console.log("Requisição POST processada com sucesso. Retornando resposta.");
        return NextResponse.json({ message: "Dados inseridos com sucesso na tabela 'works'!" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao inserir dados na tabela 'works':", error);
        return NextResponse.json({ error: 'Erro interno do servidor. Consulte os logs para obter mais informações.' }, { status: 500 });
    }
}