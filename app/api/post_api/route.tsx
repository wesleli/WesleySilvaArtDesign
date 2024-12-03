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

// Função para garantir que o diretório existe
async function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath);
  try {
    await mkdir(dirname, { recursive: true });
  } catch (error: any) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }
}

// Método POST: para criar um novo projeto
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const data: Work = {
      id: formData.get("id") as string,
      tag: (formData.get("tag") as string)?.split(",").map((tag) => tag.trim()) || [],
      nome: formData.get("nome") as string,
      data: formData.get("data") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
      imagens: (formData.get("imagens") as string)?.split(",").map((img) => img.trim()) || [],
      categoria: formData.get("categoria") as string,
      conteudos: JSON.parse(formData.get("conteudos") as string) as Conteudo[],
    };

    const diretorio = `public/imagens/db/${data.categoria}/${data.nome}`;
    await ensureDirectoryExists(diretorio);

    // Salvar arquivos no diretório especificado
    for (let i = 0; i < data.conteudos.length; i++) {
      const conteudo = data.conteudos[i];
      const conteudoId = `${data.id}_${i + 1}`;
      const caminho = `${conteudoId}_${conteudo.caminho}`;
      data.conteudos[i] = { id: conteudoId, tipo: conteudo.tipo, caminho };

      const arquivoBlob = formData.get(conteudo.caminho) as Blob;
      if (arquivoBlob) {
        const arrayBuffer = await arquivoBlob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const filePath = path.join(diretorio, caminho);
        await writeFile(filePath, uint8Array);
      }
    }

    // Inserir novo projeto no banco
    await sql`
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

    return NextResponse.json({ message: "Projeto adicionado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao adicionar projeto:", error);
    return NextResponse.json({ error: "Erro ao adicionar projeto" }, { status: 500 });
  }
}
