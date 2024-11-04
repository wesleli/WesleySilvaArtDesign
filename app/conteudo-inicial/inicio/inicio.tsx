'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Inicio() {
    const router = useRouter();

    return (
        <section className="w-full h-screen flex flex-col justify-between p-4 md:p-8">
            {/* Topo com redes sociais */}
            <div className="flex justify-between items-start h-[10vh]">
                <div className="flex space-x-2 md:space-x-3 absolute top-4 right-4">
                    <a href="https://wa.me/5541996922729" target="_blank" rel="noopener noreferrer">
                        <Image src="https://img.icons8.com/?size=100&id=16733&format=png&color=F42B2B" width={30} height={30} alt="WhatsApp" />
                    </a>
                    <a href="https://www.linkedin.com/in/wesleysilvaartdesign" target="_blank" rel="noopener noreferrer">
                        <Image src="https://img.icons8.com/?size=100&id=8808&format=png&color=F42B2B" width={30} height={30} alt="LinkedIn" />
                    </a>
                    <a href="https://www.instagram.com/wes.artdesign/" target="_blank" rel="noopener noreferrer">
                        <Image src="https://img.icons8.com/?size=100&id=32309&format=png&color=F42B2B" width={30} height={30} alt="Instagram" />
                    </a>
                    <a href="https://www.behance.net/wesleydasilva15" target="_blank" rel="noopener noreferrer">
                        <Image src="https://img.icons8.com/?size=100&id=12485&format=png&color=F42B2B" width={30} height={30} alt="Behance" />
                    </a>
                    <a href="https://github.com/wesleli" target="_blank" rel="noopener noreferrer">
                        <Image src="https://img.icons8.com/?size=100&id=12599&format=png&color=F42B2B" width={30} height={30} alt="GitHub" />
                    </a>
                </div>
            </div>

            {/* Contêiner central com retângulo preto e texto alinhado na parte inferior */}
            <div className="flex justify-center items-center h-[60vh] mx-4 md:mx-20">
                <div className="flex w-full h-full pb-10">
                    {/* Retângulo preto com "arte" alinhado na parte inferior */}
                    <div className="w-1/2 h-full bg-black flex justify-end items-end pb-6 pr-8">
                        <button
                            onClick={() => router.push('/arte')}
                            className="text-4xl md:text-6xl font-bold text-red-600 transform hover:scale-105 transition-transform"
                        >
                            arte
                        </button>
                    </div>
                    {/* Espaço para "design" alinhado na parte inferior */}
                    <div className="w-1/2 h-full flex justify-start items-end pb-5 pl-8">
                        <button
                            onClick={() => router.push('/design')}
                            className="text-4xl md:text-6xl font-bold text-gray-900 transform hover:scale-105 transition-transform"
                        >
                            design
                        </button>
                    </div>
                </div>
            </div>

            {/* Nome e relógio no rodapé */}
            <div className="flex justify-between items-center py-4">
                <h1 className="text-xl md:text-2xl font-bold text-red-600">
                    Wesley da Silva
                </h1>
                <button onClick={() => router.push('/theclock')}>
                    <Image src="https://img.icons8.com/?size=100&id=59760&format=png&color=F42B2B" width={30} height={30} alt="Clock Icon" />
                </button>
            </div>
        </section>
    );
}

