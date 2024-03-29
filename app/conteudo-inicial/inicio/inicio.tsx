
'use client'

import Image from "next/image"



export default function Inicio() {


    return <section id="conteudo-01">
                    
                    <div className="redessociais">
                        <ul>
                            <li><a href="https://www.behance.net/wesleydasilva15"> <Image 
                            src="/imagens/redes_BE_icon_01.png"
                            width={50}
                            height={50}
                            alt="Behance"
                            /> </a></li>
                            <li><a href="https://www.instagram.com/wes.artdesign/"><Image 
                            src="/imagens/redes_INS_icon_01.png"
                            width={50}
                            height={50}
                            alt="Instagram"/></a></li>
                            <li><a href="https://www.linkedin.com/in/wesleysilvaartdesign/"><Image 
                            src="/imagens/redes_LIN_icon_01.png"
                            width={50}
                            height={502}
                            alt="Linked In"/></a></li>
                            <li><a href="https://github.com/wesleli"><Image 
                            src="/imagens/redes_GIT_icon_01.png"
                            width={50}
                            height={50}
                            alt="GIT"/></a></li>
                            <li><a href="https://wa.me/qr/B2XJ4SCQTXRZA1"><Image 
                            src="/imagens/redes_WA_icon_01.png"
                            width={50}
                            height={50}
                            alt="Whatsapp"/></a></li>
                        </ul>
                    </div>
                    <div className="conteiner">
                    <div className="quadradoinicio">
                        <div><h1>WESLEY SILVA</h1>
                        
                            <p>ARTISTA INTERDISCIPLINAR</p>
                            <p>DE VOLTA REDONDA (Rj), MORANDO EM CURITIBA</p>
                            <p>CONHECIMENTO EM DESIGN E PROGRAMAÇAO</p>
                            <br/>
                            <p>DISPONÍVEL PARA TRABALHOS</p>

                        </div>
                        <div className="data-square">
                            <Image src="/imagens/square.png" width={30} height={30} alt="square"/>
                            <h2>2023</h2>
                        </div>
                    </div>
                    <div className="fotoperfil">
                        <Image src="/imagens/FotoPerfil.png"
                            width={540}
                            height={530}
                            alt="Foto Perfil"></Image>
                    </div>
                    </div>
            </section>
}