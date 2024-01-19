// Importe os tipos necessários
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

type Product = {
  id: string;
  categoria: string;
  url: string[];
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
      const products: Product | null = result.rows.length > 0
      ? {
          id: result.rows[0].id,
          categoria: result.rows[0].categoria,
          url: result.rows[0].url.split(','), // Supondo que as URLs estejam separadas por vírgula
        }
      : null;

      return NextResponse.json({ products }, { status: 200 });
    }

    // Lógica para solicitar um trabalho específico com base no ID
    const result = await sql`SELECT * FROM trabalhos WHERE id = ${id};`;
    const product: Product | null = result.rows.length > 0
      ? {
          id: result.rows[0].id,
          categoria: result.rows[0].categoria,
          url: result.rows[0].url,
        }
      : null;

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}