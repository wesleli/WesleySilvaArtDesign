
import Image from "next/image"

export default function Arte () {
    return <section id="conteudo-03">
                    <div className="button-up">
                        <a href="#conteudo-02"><Image src="/imagens/icon_acima.png" width={75}
                            height={65}
                            alt="ir para cima">
                                </Image></a></div>
                    <div className="titulosection"><h1>ARTE</h1></div>
                    <div className="linkportfolio"><a href="/art"><button
                    >ACESSAR PORTFÓLIO</button></a></div>
                    <div className="button-down">
                        <a href="#conteudo-04"><Image src="/imagens/icon_abaixo.png" width={75}
                            height={65}
                            alt="ir para baixo"></Image></a>
                    </div>
    </section>
}