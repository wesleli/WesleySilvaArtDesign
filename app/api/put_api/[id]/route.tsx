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
  texto: string;
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

// Método PUT: para atualizar um projeto existente
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const formData = await req.formData();
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: "ID do projeto não fornecido" }, { status: 400 });
    }

    const data: Work = {
      id,
      tag: JSON.parse(formData.get("tag") as string),
      nome: formData.get("nome") as string,
      data: formData.get("data") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
      imagens: JSON.parse(formData.get("imagens") as string),
      categoria: formData.get("categoria") as string,
      conteudos: JSON.parse(formData.get("conteudos") as string) as Conteudo[],
      texto: formData.get("texto") as string,
    };

    const diretorio = `public/imagens/db/${data.categoria}/${data.nome}`;
    await ensureDirectoryExists(diretorio);

    // Atualizar arquivos no diretório especificado
    for (let i = 0; i < data.conteudos.length; i++) {
      const conteudo = data.conteudos[i];
      const conteudoId = `${data.id}_${i + 1}`;
      const caminho = `${conteudo.caminho}`;
      data.conteudos[i] = { id: conteudoId, tipo: conteudo.tipo, caminho };

      const arquivoBlob = formData.get(conteudo.caminho) as Blob;
      if (arquivoBlob) {
        const arrayBuffer = await arquivoBlob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const filePath = path.join(diretorio, caminho);
        await writeFile(filePath, uint8Array);
      }
    }

    // Atualizar projeto no banco de dados
    await sql`
      UPDATE works
      SET
        tag = ${JSON.stringify(data.tag)},
        nome = ${data.nome},
        data = ${data.data},
        description = ${data.description},
        url = ${data.url},
        imagens = ${JSON.stringify(data.imagens)},
        categoria = ${data.categoria},
        conteudos = ${JSON.stringify(data.conteudos)},
        texto =  ${data.texto}
      WHERE id = ${id};
    `;

    return NextResponse.json({ message: "Projeto atualizado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return NextResponse.json({ error: "Erro ao atualizar projeto" }, { status: 500 });
  }
}

