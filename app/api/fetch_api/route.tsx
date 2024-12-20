import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";



type Work = {
    id: string;
    tag: string[];
    nome: string;
    data: string;
    description: string;
    url: string;

    categoria: string;

    texto: string;
};

export async function GET(request: Request) {
    try {
        // Converte request.url para um objeto URL
        const url = new URL(request.url);

        // Obtém os parâmetros de consulta da URL
        const id = url.searchParams.get("id");
        const categoria = url.searchParams.get("categoria"); // Novo parâmetro de consulta

        // Lógica para solicitar um trabalho específico com base no ID
        if (id) {
            const result = await sql`SELECT * FROM works WHERE id = ${id};`;
            const work: Work | null = result.rows.length > 0
            ? {
                id: result.rows[0].id,
                tag: result.rows[0].tag,
                nome: result.rows[0].nome,
                data: result.rows[0].data,
                description: result.rows[0].description,
                url: result.rows[0].url,

                categoria: result.rows[0].categoria,

                texto: result.rows[0].texto
            }
            : null;

            return NextResponse.json({ work }, { status: 200 });
        }

        // Lógica para solicitar trabalhos por categoria
        if (categoria) {
            const result = await sql`SELECT * FROM works WHERE categoria = ${categoria};`;
            const works: Work[] = result.rows.map((row) => ({
                id: row.id,
                tag: row.tag, // Alteração: nome da coluna 'tag' para 'tags'
                nome: row.nome,
                data: row.data,
                description: row.description,
                url: row.url,

                categoria: row.categoria,

                texto: row.texto  // Definindo conteudo como null se a coluna não existir
            }));

            return NextResponse.json({ works }, { status: 200 });
        }

        // Lógica para solicitar todos os trabalhos
        const result = await sql`SELECT * FROM works;`;
        const works: Work[] = result.rows.map((row) => ({
            id: row.id,
            tag: row.tag, // Alteração: nome da coluna 'tag' para 'tags'
            nome: row.nome,
            data: row.data,
            description: row.description,
            url: row.url,

            categoria: row.categoria,

            texto: row.texto  // Definindo conteudo como null se a coluna não existir
        }));

        return NextResponse.json({ works }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}