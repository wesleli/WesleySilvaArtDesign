import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Work = {
  id: string;
  nome: string;
  data: string;
  description: string;
  tag: string[];
  url: string;
  imagens: string[];
};


const Detalhesdb = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || '';
  const [loading, setLoading] = useState(true);

  const [productData, setProductData] = useState<Work | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(`/api/fetch_api?id=${productId}`);
        const result = await response.json();

        if (typeof result === 'object' && result.work) {
          setProductData(result.work);

        } else {
          console.error("Os dados recebidos não contêm um objeto 'product':", result);

        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);

      } finally {
        setLoading(false);
      }
    }

    if (searchParams.get('productId')) {
      fetchData();
    } else {
      setProductData(null);
    }
  }, [searchParams, productId]);

  if (!productId) {
    return null;
  }

  if (loading) {
    return <div>Carregando...</div>;
  }


  return (
    <div className='ml-2 font-mono text-base md:text-xs'>
          {productData ? (
      <>
        <div className='flex flex-col mb-2'>
          <h1 className='font-semibold text-lg'>{productData.nome}</h1>
        </div>
        <div className='flex flex-col mb-2'>
          <h1 className='font-semibold mr-2 text-sm'>ID: </h1><p>{productData.id}</p>
        </div>
        <div className='flex flex-col mb-2 text-sm'>
          <p>tags</p>
        </div>
        <div className='flex flex-col mb-2'>
          <h1 className='font-semibold mr-2 text-sm'>Ano: </h1><p>{productData.data}</p>
        </div>
        <div className='flex flex-col mb-2'>
          <h1 className='font-semibold mr-2 text-sm'>Descrição: </h1><p>{productData.description}</p>
        </div>
      </>
    ) : (
      <p>Dados não encontrados</p>
    )}
    </div>
  );
};

export default Detalhesdb;