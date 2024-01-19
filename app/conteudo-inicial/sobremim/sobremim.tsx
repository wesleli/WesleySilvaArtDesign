import Image from "next/image"

export default function Sobremim() {


    return <div id="conteudo-04">
                    <div className="button-up">
                        <a href="#conteudo-01"><Image src="/imagens/icon_acima.png" width={75}
                            height={65}
                            alt="ir para cima">
                        </Image></a>
                    </div>
                    <div className="redessociais2">
                        <ul>
                            <li><a href="https://www.behance.net/wesleydasilva15"> <Image 
                            src="/imagens/redes_BE_icon_02.png"
                            width={50}
                            height={50}
                            alt="Behance"
                            /> </a></li>
                            <li><a href="https://www.instagram.com/wes.artdesign/"><Image 
                            src="/imagens/redes_INS_icon_02.png"
                            width={50}
                            height={50}
                            alt="Instagram"/></a></li>
                            <li><a href="https://www.linkedin.com/in/wesleysilvaartdesign/"><Image 
                            src="/imagens/redes_LIN_icon_02.png"
                            width={50}
                            height={50}
                            alt="Linked In"/></a></li>
                            <li><a href="https://github.com/wesleli"><Image 
                            src="/imagens/redes_GIT_icon_02.png"
                            width={50}
                            height={50}
                            alt="GIT"/></a></li>
                            <li><a href="https://wa.me/qr/B2XJ4SCQTXRZA1"><Image 
                            src="/imagens/redes_WA_icon_02.png"
                            width={50}
                            height={50}
                            alt="Whatsapp"/></a></li>
                        </ul>
                        </div>
                        <div className="sobremim"><h1>SOBRE MIM</h1><p>Sou um artista interdisciplinar dotado de habilidades tanto em design gráfico quanto em programação WEB, destacando React JS, Arquitetura MVC, Javascript, HTML, SQL e Bancos de Dados. Possuo conhecimento avançado em Excel, além de habilidades intermediárias em Photoshop, Illustrator e React JS. Minha expressão artística abrange diversos meios, incluindo arte performance, colagem e pintura abstrata/surrealista. Combino diferentes áreas do conhecimento para um projeto de pensamento integrado visando uma perspectiva inovadora de arte e comunicação.</p></div>
                        <div className="iconclock">
                        <a href="#conteudo-05"><Image src="/imagens/iconrelogio_Lighton.png" width={60}
                            height={90}
                            alt="iconclock"></Image></a>

                    </div>
            
            
            </div>
}