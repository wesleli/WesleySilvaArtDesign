import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import fs from "fs";
import path from "path";
import util from "util";

const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

type Work = {
  id: string;
  tag?: string[];
  nome?: string;
  data?: string;
  description?: string;
  url?: string;
  categoria?: string;
  texto?: string;
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

    // Extrair dados do formulário, permitindo valores nulos
    const tag = formData.get("tag");
    const nome = formData.get("nome");
    const data = formData.get("data");
    const description = formData.get("description");
    const url = formData.get("url");
    const imagens = formData.get("imagens");
    const categoria = formData.get("categoria");
    const conteudos = formData.get("conteudos");
    const texto = formData.get("texto");

    const dataObj: Work = {
      id,
      tag: tag ? JSON.parse(tag as string) : undefined,
      nome: nome ? nome as string : undefined,
      data: data ? data as string : undefined,
      description: description ? description as string : undefined,
      url: url ? url as string : undefined,

      categoria: categoria ? categoria as string : undefined,

      texto: texto ? texto as string : undefined,
    };

    const diretorio = `public/imagens/db/${dataObj.categoria}/${dataObj.nome}`;

    // Gerar a query dinamicamente com base nos campos presentes
    const updateFields: any = [];
    if (dataObj.tag) updateFields.push(sql`tag = ${JSON.stringify(dataObj.tag)}`);
    if (dataObj.nome) updateFields.push(sql`nome = ${dataObj.nome}`);
    if (dataObj.data) updateFields.push(sql`data = ${dataObj.data}`);
    if (dataObj.description) updateFields.push(sql`description = ${dataObj.description}`);
    if (dataObj.url) updateFields.push(sql`url = ${dataObj.url}`);

    if (dataObj.categoria) updateFields.push(sql`categoria = ${dataObj.categoria}`);

    if (dataObj.texto) updateFields.push(sql`texto = ${dataObj.texto}`);

    if (updateFields.length > 0) {
      // Atualizar projeto no banco de dados com base nos campos fornecidos
      const setClause = updateFields.join(", ");
      await sql`
  UPDATE works
  SET
    tag = ${dataObj.tag ? JSON.stringify(dataObj.tag) : undefined},
    nome = ${dataObj.nome || undefined},
    data = ${dataObj.data || undefined},
    description = ${dataObj.description || undefined},
    url = ${dataObj.url || undefined},

    categoria = ${dataObj.categoria || undefined},

    texto = ${dataObj.texto || undefined}
  WHERE id = ${id};
`;
    }

    return NextResponse.json({ message: "Projeto atualizado com sucesso!" }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao atualizar projeto:", error.message);
    return NextResponse.json({ error: "Erro ao atualizar projeto", details: error.message }, { status: 500 });
  }
}