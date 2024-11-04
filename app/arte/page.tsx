"use client";

import { Links } from "../components/links"
import Conteiner from '../components/conteiner';
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Page() { 
    
    const router = useRouter();
    const [selectedButton, setSelectedButton] = useState('primeiroBotao');
    const [productId, setProductId] = useState<string | null>(null);

    const id = "arte"

    return <div className="absolute p-6 font-mono bg-white bg-scroll h-full w-full text-black">
            <button  onClick={() => router.push('/design')}><h1 id="identify" className="text-sm text-yellow-600">Arte.</h1></button>
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