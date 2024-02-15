"use client";

import { Links } from "../components/links"
import Conteiner from '../components/conteiner';
import { useState } from "react";



export default function Page() { 
    
    const [selectedButton, setSelectedButton] = useState('primeiroBotao');
    const [productId, setProductId] = useState<string | null>(null);

    const id = "arte"

    return <div className="absolute p-6 font-mono bg-white bg-scroll h-full w-full text-black">
            <h1 className="text-sm text-yellow-600">Arte.</h1>
                <div className="relative w-90 h-full">
                <Links
                    parentId={id}
                    selectedButton={selectedButton}
                    productId={productId}
                    setSelectedButton={setSelectedButton}
                    setProductId={setProductId}
                />
                <Conteiner
                    parentId={id}
                    selectedButton={selectedButton}
                    productId={productId}
                    setSelectedButton={setSelectedButton}
                    setProductId={setProductId}
                 />
                </div>
            </div>

  }