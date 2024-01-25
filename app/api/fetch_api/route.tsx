// Importe os tipos necessários
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

type Work = {
    id: string;
    tags: string[];
    nome: string;
    data: string;
    description: string;
    url: string;
    imagens: string[];
    categoria: string;
  };

export async function GET(request: Request) {


  
  try {
    // Verifica se a solicitação é do tipo GET
    if (request.method !== "GET") {
      return NextResponse.json({ error: "Método não permitido" }, { status: 405 });
    }

    // Converte request.url para um objeto URL
    const url = new URL(request.url);

    // Obtém os parâmetros de consulta da URL
    const id = url.searchParams.get("id");

    // Lógica para solicitar todos os trabalhos
    if (!id) {
        const result = await sql`SELECT * FROM works;`;
        const works: Work[] = result.rows.map((row) => ({
          id: row.id,
          tags: row.tag,
          nome: row.nome,
          data: row.data,
          description: row.description,
          url: row.url,
          imagens: row.imagens,
          categoria: row.categoria
        }));
  
        return NextResponse.json({ works }, { status: 200 });
      }

    // Lógica para solicitar um trabalho específico com base no ID
    const result = await sql`SELECT * FROM works WHERE id = ${id};`;
    const work: Work | null = result.rows.length > 0
      ? {
          id: result.rows[0].id,
          tags: result.rows[0].tag,
          nome: result.rows[0].nome,
          data: result.rows[0].data,
          description: result.rows[0].description,
          url: result.rows[0].url,
          imagens: result.rows[0].imagens,
          categoria: result.rows[0].categoria,
        }
      : null;

    return NextResponse.json({ work }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}