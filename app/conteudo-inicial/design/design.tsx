'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Design () {

    const router = useRouter();

    return <section id="conteudo-02">
                    <div className="titulosection"><h1>DESIGN</h1></div>
                    <div className="linkportfolio"><button type="button" onClick={() => router.push('/design')}>
                    ACESSAR PORTFÓLIO</button></div>
            </section>
}