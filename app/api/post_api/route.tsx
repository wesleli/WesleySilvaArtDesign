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
  id: string | null;
  tag: string[] | null;
  nome: string | null;
  data: string | null;
  description: string | null;
  url: string | null;
  imagens: string[] | null;
  categoria: string | null;
  conteudos: Conteudo[] | null;
  texto: string | null;
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
    const contentType = req.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Tipo de conteúdo inválido." }, { status: 400 });
    }

    const formData = await req.formData();

    // Montar os dados recebidos do FormData, atribuindo `null` se não forem enviados
    const data: Work = {
      id: (formData.get("id") as string) || null,
      tag: (formData.get("tag") as string)?.split(",").map((tag) => tag.trim()) || null,
      nome: (formData.get("nome") as string) || null,
      data: (formData.get("data") as string) || null,
      description: (formData.get("description") as string) || null,
      url: (formData.get("url") as string) || null,
      imagens: (formData.get("imagens") as string)?.split(",").map((img) => img.trim()) || null,
      categoria: (formData.get("categoria") as string) || null,
      conteudos: formData.get("conteudos")
        ? JSON.parse(formData.get("conteudos") as string)
        : null,
      texto: (formData.get("texto") as string) || null,
    };

    const diretorio = data.categoria && data.nome
      ? `public/imagens/db/${data.categoria}/${data.nome}`
      : null;

    if (diretorio) {
      await ensureDirectoryExists(diretorio);
    }

    // Salvar arquivos no diretório especificado
    if (data.conteudos) {
      for (let i = 0; i < data.conteudos.length; i++) {
        const conteudo = data.conteudos[i];
        const conteudoId = `${data.id}_${i + 1}`;
        const caminho = `${conteudoId}_${conteudo.caminho}`;
        data.conteudos[i] = { id: conteudoId, tipo: conteudo.tipo, caminho };

        const arquivoBlob = formData.get(conteudo.caminho) as Blob;
        if (arquivoBlob) {
          const arrayBuffer = await arquivoBlob.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          const filePath = path.join(diretorio!, caminho);
          await writeFile(filePath, uint8Array);
        }
      }
    }

    // Inserir novo projeto no banco
    await sql`
      INSERT INTO works (id, tag, nome, data, description, url, imagens, categoria, conteudos, texto)
      VALUES (
          ${data.id},
          ${data.tag ? JSON.stringify(data.tag) : null},
          ${data.nome},
          ${data.data},
          ${data.description},
          ${data.url},
          ${data.imagens ? JSON.stringify(data.imagens) : null},
          ${data.categoria},
          ${data.conteudos ? JSON.stringify(data.conteudos) : null},
          ${data.texto}
      );
    `;

    return NextResponse.json({ message: "Projeto adicionado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao adicionar projeto:", error);
    return NextResponse.json({ error: "Erro ao adicionar projeto" }, { status: 500 });
  }
}
