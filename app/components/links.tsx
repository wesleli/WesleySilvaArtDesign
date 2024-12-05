"use client";

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import IconTela01 from "./imagens/Telas_01.png";
import IconTela02 from "./imagens/Telas_02.png";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Work = {
  id: string;
  // Outras propriedades do produto
};

type LinksProps = {
  parentId: string;
  selectedButton: string;
  productId: string | null;
  setSelectedButton: React.Dispatch<React.SetStateAction<string>>;
  setProductId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Links: React.FC<LinksProps> = ({
  parentId,
  selectedButton,
  productId,
  setSelectedButton,
  setProductId,
}) => {
  const router = useRouter();
  const parentName = parentId || '';
  const pathname = usePathname();
  const searchParams = useSearchParams(); 

  const handleButtonClick = async (buttonId: string, path: any) => {
    if (productId === null) { try {
      // Busca os trabalhos da API
      const response = await fetch(`/api/fetch_api?categoria=${parentName}`);
      const work = await response.json();
      const data = work.works;
      console.log(data)
  
      if (data && data.length > 0) {
        // Encontra o ID do primeiro trabalho na categoria
        const firstWorkId = data[0].id;
        setProductId(firstWorkId);
        setSelectedButton(buttonId);
        const firstPath: any = `/${parentName}?trabalho=${firstWorkId}`;
        router.push(firstPath);
      } else {
        setSelectedButton(buttonId);
        router.push(path);
      }
    } catch (error) {
      console.error('Error fetching work:', error);
      const url: any = `/${parentName}`;
      router.push(url);
    } } else {
      setSelectedButton(buttonId);
      router.push(path);
    }
  };

  useEffect(() => {
    const productIdFromParams = searchParams.get('trabalho');

    if (productIdFromParams) {
      setProductId(productIdFromParams);
      setSelectedButton(productIdFromParams === 'null' ? 'primeiroBotao' : 'segundoBotao');
    } else {
      // Se não houver productId nos parâmetros, definir o primeiro botão como selecionado
      setSelectedButton('primeiroBotao');
    }
  }, [searchParams, setProductId, setSelectedButton]);

  useEffect(() => {
    const handleSearchParamsChange = () => {
      const productIdFromParams = searchParams.get('trabalho');

      if (productIdFromParams) {
        setSelectedButton(productIdFromParams === 'null' ? 'primeiroBotao' : 'segundoBotao');
      } else {
        // Se não houver productId nos parâmetros, definir o primeiro botão como selecionado
        setSelectedButton('primeiroBotao');
        
      }
    };

    // Adicionar um ouvinte para o evento de mudança nos parâmetros de busca
    window.addEventListener('searchParamsChange', handleSearchParamsChange);

    // Remover o ouvinte ao desmontar o componente
    return () => {
      window.removeEventListener('searchParamsChange', handleSearchParamsChange);
    };
  }, [searchParams, setSelectedButton]);

  return (
    <nav className='flex flex-col sm:flex-row items-center  justify-center sm:justify-between text-black bg-gray-200 w-full'>
      <ul className='inline-flex items-center justify-center  m-3 sm:m-5'>
        <li>
          <button
            onClick={() => handleButtonClick('primeiroBotao', `/${parentName}`)}
            type='button'
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 sm:m-0  ${selectedButton === 'primeiroBotao' ? 'active' : ''}`}
          >
            <Image src={IconTela01} alt="alt" width={50} height={50} />
          </button>
        </li>
        <li>
          <button
            onClick={() => handleButtonClick('segundoBotao', `/${parentName}?trabalho=${productId}`)}
            type='button'
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2  ${selectedButton === 'segundoBotao' ? 'active' : ''}`}
          >
            <Image src={IconTela02} alt="alt" width={50} height={50} />
          </button>
        </li>
      </ul>
      <ul className='inline-flex items-center justify-center sm:flex-row m-3 sm:m-8'>
        <li className={`sm:ml-2 flex content-center justify-items-center items-center justify-center ${pathname === '/' ? 'active' : ''}`}>
          <Link href="/" className='text-xs text-center items-center justify-center hover:text-yellow-600'>https://wesleysilvaart<br/>design.vercel.app/</Link>
        </li>
      </ul>
    </nav>
  );
}