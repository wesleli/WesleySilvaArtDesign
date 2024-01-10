"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import IconTela01 from "./imagens/Telas_01.png"
import IconTela02 from "./imagens/Telas_02.png"

export function Links() {
  const pathname = usePathname();

  return (
    <nav className='flex items-center justify-between text-black bg-slate-100 h-1/5'>
      <ul className='inline-flex items-center justify-center px-5'>
        <li><button  type='button' className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2"> <Image src={IconTela01} alt="alt" width={80} height={60} /></button></li>
        <li><button  type='button'className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2"><Image src={IconTela02} alt="alt" width={80} height={60} /></button></li>
      </ul>
      <ul className='flex items-center justify-center w-1/4 hover:text-yellow-600'>
        <li className={pathname === '/' ? 'active' : ''}>
          <Link  className="link" href="/">
          https://wesleysilvaart<br/>design.vercel.app/
          </Link>
        </li>
      </ul>
    </nav>
  );
}