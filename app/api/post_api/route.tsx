import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";







type Work = {
  id: string | null;
  tag: string[] | null;
  nome: string | null;
  data: string | null;
  description: string | null;
  url: string | null;

  categoria: string | null;

  texto: string | null;
};

// Função para garantir que o diretório existe


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

      categoria: (formData.get("categoria") as string) || null,

      texto: (formData.get("texto") as string) || null,
    };

    const diretorio = data.categoria && data.nome
      ? `public/imagens/db/${data.categoria}/${data.nome}`
      : null;





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

          ${data.categoria},

          ${data.texto}
      );
    `;

    return NextResponse.json({ message: "Projeto adicionado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao adicionar projeto:", error);
    return NextResponse.json({ error: "Erro ao adicionar projeto" }, { status: 500 });
  }
}
