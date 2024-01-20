'use client';


import Image from "next/image"
import { useRouter } from "next/navigation";

export default function Arte () {

    const router = useRouter();

    return <section id="conteudo-03">
                    <div className="button-up">
                        <a href="#conteudo-02"><Image src="/imagens/icon_acima.png" width={75}
                            height={65}
                            alt="ir para cima">
                                </Image></a></div>
                    <div className="titulosection"><h1>ARTE</h1></div>
                    <div className="linkportfolio"><button type="button" onClick={() => router.push('/art')}>
                    ACESSAR PORTFÓLIO</button></div>
                    <div className="button-down">
                        <a href="#conteudo-04"><Image src="/imagens/icon_abaixo.png" width={75}
                            height={65}
                            alt="ir para baixo"></Image></a>
                    </div>
    </section>
}