"use client";

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='flex bg-slate-900 h-full w-full items-center content-center justify-center font-mono text-lg text-center'>
      <div className='flex-col align-text-center items-center content-center justify-center font-mono text-lg text-center'>
      <h1 className='text-red-600'>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <button onClick={() => router.back()}><h1 className='font-extrabold '>Voltar para a pagina Anterior.</h1></button>
      </div>
    </div>
  );
};
