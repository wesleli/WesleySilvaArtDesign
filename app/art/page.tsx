"use client";

import { Links } from "../components/links"
import Conteiner from '../components/conteiner';
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter(); // Inicialize o router
    const [selectedButton, setSelectedButton] = useState('primeiroBotao');
    const [productId, setProductId] = useState('1');

    const id = "arte"

    return <div className="absolute p-6 font-mono bg-white bg-scroll h-full w-full text-black">
            <h1 className="ml-2 text-yellow-600">Arte.</h1>
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