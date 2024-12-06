import { NextRequest, NextResponse } from 'next/server';
import { app } from '@/firebase'; // Certifique-se de que o caminho está correto
import { getStorage, ref, listAll } from 'firebase/storage';

// Inicializa o armazenamento do Firebase
const storage = getStorage(app);
const prefix = 'projetocaoseordem/';

// Função para buscar imagens do bucket
export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        // Referência ao diretório
        const listRef = ref(storage, prefix);

        // Lista todos os arquivos na referência
        const res = await listAll(listRef);

        if (!res.items.length) {
            return NextResponse.json({ message: 'Nenhuma imagem encontrada.' }, { status: 404 });
        }

        // Constrói URLs das imagens com o prefixo
        const imageUrls = res.items.map(item => 
            `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/${encodeURIComponent(prefix + item.name)}?alt=media`
        );

        return NextResponse.json({ images: imageUrls }, { status: 200 });
    } catch (error) {
        console.error('Erro ao acessar o bucket:', error);
        return NextResponse.json({ error: 'Erro ao acessar o bucket.' }, { status: 500 });
    }
}