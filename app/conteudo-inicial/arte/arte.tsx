'use client';


import Image from "next/image"
import { useRouter } from "next/navigation";

export default function Arte () {

    const router = useRouter();

    return <section id="conteudo-03">
                    <div className="titulosection"><h1>ARTE</h1></div>
                    <div className="linkportfolio"><button type="button" onClick={() => router.push('/art')}>
                    ACESSAR PORTFÓLIO</button></div>
    </section>
}