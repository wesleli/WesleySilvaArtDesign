import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Product = {
  id: string;
  nome: string;
  ano: string;
  description: string;
  url: string;
  imagens: [string];
};


const Detalhesdb = () => {
  
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || '';

  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Faz uma chamada Fetch para sua API
        const response = await fetch(`/api/fetch_api?id=${productId}`);
        const result = await response.json();

        // Verifica se result é um objeto e contém uma propriedade 'product' que é um objeto
        if (typeof result === 'object' && result.product) {
          // Ajuste a propriedade 'product' para 'productData'
          setProductData(result.product);
        } else {
          console.error("Os dados recebidos não contêm um objeto 'product':", result);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    // Verifica se há um parâmetro de consulta chamado "productId" na URL
    if (searchParams.get('productId')) {
      // Se houver, chama a função fetchData para buscar os dados do produto
      fetchData();
    } else {
      // Se não houver mais parâmetros de pesquisa, você pode fechar o elemento
      setProductData(null);
    }
  }, [searchParams, productId]);

  if (!productData) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className='detalhesdb block font-mono text-sm'>
              <div style={{ display: 'flex'}}>
            <h1 className='font-semibold'>{productData.nome}</h1>
          </div>
          <div style={{ display: 'flex'}}>
            <h1 className='font-semibold mr-2'>ID: </h1><p>{productData.id}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>tags</p>
          </div>
          <div style={{ display: 'flex'}}>
            <h1 className='font-semibold mr-2'>Ano: </h1><p>{productData.ano}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 className='font-semibold mr-2'>Descrição: </h1><p>{productData.description}</p>
          </div>
    </div>
  );
};

export default Detalhesdb;