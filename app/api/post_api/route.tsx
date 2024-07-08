import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import fs from "fs";
import path from "path";
import util from "util";

const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

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

async function ensureDirectoryExists(filePath: string) {
    const dirname = path.dirname(filePath);
    try {
        await mkdir(dirname, { recursive: true });
    } catch (error:any) {
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    console.log("Recebendo requisição POST...");

    try {
        // Extrai os dados da requisição POST
        const formData = await req.formData();

        // Extrai os dados do formulário
        const data: Work = {
            id: formData.get("id") as string,
            tag: (formData.get("tag") as string).split(",").map(tag => tag.trim()),
            nome: formData.get("nome") as string,
            data: formData.get("data") as string,
            description: formData.get("description") as string,
            url: formData.get("url") as string,
            imagens: (formData.get("imagens") as string).split(",").map(imagem => imagem.trim()),
            categoria: formData.get("categoria") as string,
            conteudos: JSON.parse(formData.get("conteudos") as string) as Conteudo[],
        };

        // Cria o diretório para armazenar os arquivos
        const diretorio = `public/imagens/db/${data.categoria}/${data.nome}`;
        await ensureDirectoryExists(diretorio);

        // Loop para salvar os arquivos na pasta criada
        for (let i = 0; i < data.conteudos.length; i++) {
            const conteudo = data.conteudos[i];
            const conteudoId = `${data.id}_${i + 1}`; // Exemplo de geração dinâmica de ID
            const tipo = conteudo.tipo; // Supondo que tipo já venha preenchido corretamente
            const caminho = `${conteudoId}_${conteudo.caminho}`; // Exemplo de geração de caminho único

            // Atualiza o conteúdo com os dados gerados dinamicamente
            data.conteudos[i] = {
                id: conteudoId,
                tipo: tipo,
                caminho: caminho,
            };

            const filePath = path.join(diretorio, caminho);
            await writeFile(filePath, conteudo.caminho);
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

        // Retorna uma resposta de sucesso
        console.log("Requisição POST processada com sucesso. Retornando resposta.");
        return NextResponse.json({ message: "Dados inseridos com sucesso na tabela 'works'!" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao inserir dados na tabela 'works':", error);
        
        return NextResponse.json({ error: 'Erro interno do servidor. Consulte os logs para obter mais informações.' }, { status: 500 });
    }
}
