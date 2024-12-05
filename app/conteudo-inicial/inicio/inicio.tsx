'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from 'react';

export default function Inicio() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    
    // Tipando a referência corretamente
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleNavigation = (path: any) => {
        setMenuOpen(false); // Fecha o menu ao navegar
        router.push(path);
    };

    useEffect(() => {
        // Tipando o evento como MouseEvent
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false); // Fecha o menu se o clique for fora
            }
        };

        // Adiciona o evento de clique no document
        document.addEventListener('mousedown', handleClickOutside);

        // Limpeza do evento quando o componente for desmontado
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <section className="w-full h-full justify-between p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-center md:justify-between mt-5 h-[10vh] mx-5 md:mx-10 mb-20">
                {/* Topo com redes sociais */}
                <div className="flex space-x-3 md:space-x-10 justify-center items-end">
                    <button className="text-lg md:text-xl font-serif text-red-600 mb-5 hover:text-hibiscus-red transition-colors">
                        wesley silva
                    </button>
                    <div className="relative group pb-5">
                        <button
                            className="relative text-lg md:text-xl font-serif text-red-600 hover:text-hibiscus-red transition-colors z-10"
                            onClick={() => setMenuOpen((prev) => !prev)}
                        >
                            trabalhos
                        </button>
                        {/* Menu suspenso */}
                        <div
                            ref={menuRef}  // Ref para o menu
                            className={`absolute left-0 mt-2 w-48 bg-white shadow-lg transition-all duration-300 ease-out transform ${
                                menuOpen
                                    ? 'opacity-100 scale-y-100'
                                    : 'opacity-0 scale-y-75 pointer-events-none'
                            } group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto z-20`}
                        >
                            <ul className="flex flex-col font-serif text-sm">
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/arte')}
                                        className="block px-4 py-2  hover:bg-gray-200 text-gray-600 transition-colors w-full text-left"
                                    >
                                        Arte
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/design')}
                                        className="block px-4 py-2  hover:bg-gray-200 text-gray-600  transition-colors w-full text-left"
                                    >
                                        Design
                                    </button>
                                </li>
                                <li>
                                    <button
                                        disabled
                                        className="block px-4 py-2  text-gray-400 w-full text-left"
                                    >
                                        Arte Educação
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Redes sociais com tooltip */}
                <div className="flex space-x-2 md:space-x-3 pb-5 justify-center items-end">
                    {[
                        { name: "WhatsApp", href: "https://wa.me/5541996922729", icon: "16733" },
                        { name: "LinkedIn", href: "https://www.linkedin.com/in/wesleysilvaartdesign", icon: "8808" },
                        { name: "Instagram", href: "https://www.instagram.com/wes.artdesign/", icon: "32309" },
                        { name: "Behance", href: "https://www.behance.net/wesleydasilva15", icon: "12485" },
                        { name: "GitHub", href: "https://github.com/wesleli", icon: "12599" },
                    ].map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group ml-2 md:ml-3"
                        >
                            <Image
                                src={`https://img.icons8.com/?size=100&id=${social.icon}&format=png&color=CC0000`}
                                width={30}
                                height={30}
                                alt={social.name}
                            />
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {social.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

        
            {/* Contêiner central com retângulo preto e texto alinhado na parte inferior */}
            <div className="flex justify-center items-center h-[50vh] mb-10 mx-4 md:mx-20">
                <div className="flex w-full h-full">
                    {/* Retângulo preto com "arte" alinhado na parte inferior */}
                    <div className="w-1/2 h-full bg-black flex justify-end items-end pb-6 pr-8">
                        <button
                            onClick={() => router.push('/arte')}
                            className="text-4xl md:text-6xl font-bold text-hibiscus-red transform hover:scale-105 transition-transform"
                        >
                            arte
                        </button>
                    </div>
                    {/* Espaço para "design" alinhado na parte inferior */}
                    <div className="w-1/2 h-full flex justify-start items-end pb-5 pl-8">
                        <button
                            onClick={() => router.push('/design')}
                            className="text-4xl md:text-6xl font-bold black transform hover:scale-105  transition-transform"
                        >
                            design
                        </button>
                    </div>
                </div>
            </div>

            {/* Nome e relógio no rodapé */}
            <div className=" flex justify-end items-center py-4 md:px-10 px-5">

                <button onClick={() => router.push('/theclock')}>
                    <Image src="https://img.icons8.com/?size=100&id=59760&format=png&color=CC0000" width={30} height={30} alt="Clock Icon" />
                </button>
            </div>
            <div className="w-full h-full justify-center items-center content-center" >
            <div className="w-4/5 h-full text-center justify-self-center align-middle content-center items-center justify-center text-red-600 font-mono text-2xl">
            <p className="leading-relaxed">
            Artista, arte educador e designer, natural de Volta Redonda (RJ) e atualmente em Curitiba (PR). Minha prática é voltada para uma reflexão crítica sobre identidade, raça, estética e dinâmicas urbanas. Como educador, vejo a arte como uma ferramenta emancipatória, essencial para o desenvolvimento de um pensamento crítico sobre o mundo.
</p>

</div>
            </div>
        </section>
    );
}

