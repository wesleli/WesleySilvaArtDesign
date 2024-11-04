"use client"

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import React from "react";
import Detalhesdb from './detalhesdb';


export default function Detalhes() {

    const searchParams = useSearchParams();
    const productId = searchParams.get('productId') || '';
    const shouldRenderDetails = searchParams.has('productId');

    
      if (!searchParams.has('productId')) {
        // Não renderiza nada se não houver dados do produto
        return null;
      }
    
    


    return ( <div className="container inline-block max-w-full overflow-x-auto">
        {shouldRenderDetails ? (
        // Certifique-se de passar Id como uma propriedade para Detalhesdb
        <Detalhesdb />
      ) : (
        <p>Não há dados do produto para exibir.</p>
      )}
  </div>
    );

}