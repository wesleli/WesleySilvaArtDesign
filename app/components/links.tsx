"use client";

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import IconTela01 from "./imagens/Telas_01.png";
import IconTela02 from "./imagens/Telas_02.png";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type LinksProps = {
  parentId: string;
  selectedButton: string;
  productId: string;
  setSelectedButton: React.Dispatch<React.SetStateAction<string>>;
  setProductId: React.Dispatch<React.SetStateAction<string>>;
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

  const handleButtonClick = (buttonId: string, path: any) => {
    if (buttonId === 'segundoBotao') {
      const params = new URLSearchParams(window.location.search);
      const productIdFromParams = params.get('productId');

      if (productIdFromParams) {
        setProductId(productIdFromParams);
      } else {
        setProductId('1');
      }
    } else {
      setProductId('1');
    }

    setSelectedButton(buttonId);
    router.replace(path); // Removido o segundo parâmetro 'undefined'
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productIdFromParams = params.get('productId');

    if (productIdFromParams) {
      setProductId(productIdFromParams);
      setSelectedButton(productIdFromParams === '1' ? 'primeiroBotao' : 'segundoBotao');
    }
  }, [pathname, setProductId, setSelectedButton, router]);

  return (
    <nav className='flex items-center justify-between text-black bg-slate-100 h-18 w-full'>
      <ul className='inline-flex items-center justify-center m-5'>
        <li>
          <button
            onClick={() => handleButtonClick('primeiroBotao', `/${parentName}`)}
            type='button'
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 ${selectedButton === 'primeiroBotao' ? 'active' : ''}`}
          >
            <Image src={IconTela01} alt="alt" width={50} height={50} />
          </button>
        </li>
        <li>
          <button
            onClick={() => handleButtonClick('segundoBotao', `/${parentName}?productId=${productId}`)}
            type='button'
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 ${selectedButton === 'segundoBotao' ? 'active' : ''}`}
          >
            <Image src={IconTela02} alt="alt" width={50} height={50} />
          </button>
        </li>
      </ul>
      <ul className='w-1/4 inline-flex items-center justify-center'>
        <li className={pathname === '/' ? 'active' : ''}>
          <Link href="/" className='text-xs hover:text-yellow-600'>
            
              https://wesleysilvaart<br/>design.vercel.app/
            
          </Link>
        </li>
      </ul>
    </nav>
  );
}