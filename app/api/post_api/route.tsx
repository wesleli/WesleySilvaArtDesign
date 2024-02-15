import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

type Conteudo = {
    id: string;
    tipo: string;
    caminho: string;
};

// Função para lidar com requisições POST
export async function POST(req: NextRequest, res: NextResponse) {
    console.log("Recebendo requisição POST...");
    if (req.method === "POST") {
        try {
            console.log("Recebida uma requisição POST válida.");

            // Verifica se o corpo da requisição contém os dados esperados
            const conteudos: Conteudo[] = await req.json(); // Extrai os conteúdos do corpo da requisição
            console.log("Conteúdos recebidos:", conteudos);
            
            if (!conteudos || conteudos.length === 0) {
                console.error('Conteúdos inválidos:', conteudos);
                return NextResponse.json({ message: 'Conteúdos inválidos' }, { status: 400 });
            }

            // Itera sobre os conteúdos e insere cada um na coluna 'conteudos' da tabela 'works'
            for (const conteudo of conteudos) {
                const { id, tipo, caminho } = conteudo;

                console.log("Objeto antes da conversão:", conteudo);
                console.log("ID a ser utilizado na atualização:", id);
                console.log("Tipo:", tipo);
                console.log("Caminho:", caminho);

     // Atualizando a coluna 'conteudos' na tabela 'works' para o id correspondente
     await sql`
     UPDATE works
     SET conteudos = jsonb_set(
         COALESCE(conteudos, '{}'::jsonb),
         '{}',
         ${JSON.stringify(conteudo)}::jsonb,
         true
     )
     WHERE id = ${id};
 `;
 
 console.log("Conteúdo inserido com sucesso para o ID:", id);
}

            // Retorna uma resposta de sucesso
            console.log("Requisição POST processada com sucesso. Retornando resposta.");
            return NextResponse.json({ message: "Conteúdos inseridos com sucesso na coluna 'conteudos' da tabela 'works'!" }, { status: 200 });
        } catch (error) {
            console.error("Erro ao inserir conteúdos na coluna 'conteudos' da tabela 'works':", error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        // Se o método HTTP não for POST, retorna uma resposta indicando método não permitido
        console.warn("Requisição recebida não é do tipo POST. Retornando status 405.");
        return NextResponse.json({ message: "Método não permitido" }, { status: 405 });
    }
}