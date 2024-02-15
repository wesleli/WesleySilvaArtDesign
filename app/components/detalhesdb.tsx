import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Work = {
  id: string;
  nome: string;
  data: string | Date;
  description: string;
  tag: string[];
  url: string;
  imagens: string[];
};


const Detalhesdb = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('productId');
  const [loading, setLoading] = useState(true);

  const [productData, setProductData] = useState<Work | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    if (productId) {
      fetchData();
    } else {
      setProductData(null);
    }

    const handleSearchParamsChange = () => {
      const newProductId = searchParams.get('productId');
      if (newProductId !== productId) {
        fetchData();
      }
    };

    // Adicionar um ouvinte para o evento de mudança nos parâmetros de busca
    window.addEventListener('searchParamsChange', handleSearchParamsChange);

    // Remover o ouvinte ao desmontar o componente
    return () => {
      window.removeEventListener('searchParamsChange', handleSearchParamsChange);
    };
  }, [searchParams, productId]);

  const handleTagClick = (tag: string) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('tag', tag);
    router.push(`?${newSearchParams.toString()}`);
  };
  


  if (!productId) {
    return null;
  }

  if (loading) {
    return <div>Carregando...</div>;
  }


  return (
    <div className='m-3 font-mono md:text-xs'>
          {productData ? (
      <>
        <div className='flex flex-col mb-2'>
          <h1 className='font-bold text-sm md:text-2xl'>{productData.nome}</h1>
        </div>
        <div className='flex flex-wrap text-sm items-center'>
        <Image src={'/imagens/backspace.svg'} 
        width={20}
        height={20}
      objectFit='contain'
      className='mr-2'
     alt='ID'/><h1 className='font-semibold mr-2 text-xs md:text-sm'>ID: </h1><p>{productData.id}</p>
        </div>
        <div className='flex flex-wrap text-xs md:text-sm items-center'>
        {productData?.tag?.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagClick(tag)}
            className="bg-gray-300 flex flex-wrap align-center text-xs md:text-sm justify-center text-gray-800 p-2 font-semibold rounded m-1 transition duration-300 hover:bg-yellow-500 hover:text-violet-900"
          ><Image src={'/imagens/tag.svg'} 
          width={20}
          height={20}
        objectFit='contain'
        className='mr-2'
       alt='tag'/>
            {tag}
          </button>
        ))}
        </div>
        <div className='flex flex-wrap text-center text-sm items-center'>
        <Image src={'/imagens/annual.svg'} 
          width={20}
          height={20}
        objectFit='contain'
        className='mr-2'
       alt='ano'/><h1 className='font-semibold mr-2 text-xs md:text-sm'>Ano: </h1>{typeof productData.data === 'string' ? (
        <p>{productData.data.slice(-4)}</p>
      ) : (
        <p>{productData.data.getFullYear()}</p>
      )}
        </div>
        <div className='flex flex-col text-xs md:text-sm font-mono'>
          <h1 className='font-semibold mr-2 text-lg'>Descrição: </h1><p>{productData.description}</p>
        </div>
      </>
    ) : (
      <p>Dados não encontrados</p>
    )}
    </div>
  );
};

export default Detalhesdb;