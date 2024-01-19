// Importe os tipos necessários
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

type Product = {
    id: string;
    nome: string;
    ano: string;
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
        const result = await sql`SELECT * FROM trabalhos;`;
        const products: Product[] = result.rows.map((row) => ({
          id: row.id,
          nome: row.nome,
          ano: row.ano,
          description: row.description,
          url: row.url,
          imagens: row.imagens,
          categoria: row.categoria
        }));
  
        return NextResponse.json({ products }, { status: 200 });
      }

    // Lógica para solicitar um trabalho específico com base no ID
    const result = await sql`SELECT * FROM trabalhos WHERE id = ${id};`;
    const product: Product | null = result.rows.length > 0
      ? {
          id: result.rows[0].id,
          nome: result.rows[0].nome,
          ano: result.rows[0].ano,
          description: result.rows[0].description,
          url: result.rows[0].url,
          imagens: result.rows[0].imagens,
          categoria: result.rows[0].categoria,
        }
      : null;

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}