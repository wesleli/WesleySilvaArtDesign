"use client";

import { Links } from "../components/links"
import Conteiner from '../components/conteiner';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [selectedButton, setSelectedButton] = useState('primeiroBotao');
    const [productId, setProductId] = useState<string | null>(null);


    const id = "design";

    return (
        <div className="p-6 font-mono h-full items-center justify-center text-black">
           <button  onClick={() => router.push('/arte')}><h1 id="identify" className="text-sm text-yellow-600">Design.</h1></button>
            <div className="block justify-center w-full h-full mb-10">
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
    );
}