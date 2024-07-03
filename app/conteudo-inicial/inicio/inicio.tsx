
'use client'

import Image from "next/image"



export default function Inicio() {


    return <section id="conteudo-01" className="container mx-auto py-12">
    <div className="flex flex-col md:flex-row items-center justify-between">
      
      {/* Redes Sociais */}
      <div className="redessociais">
        <ul className="flex space-x-4">
          <li>
            <a href="https://www.behance.net/wesleydasilva15" target="_blank" rel="noopener noreferrer">
              <Image 
                src="/imagens/redes_BE_icon_01.png"
                width={50}
                height={50}
                alt="Behance"
              />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/wes.artdesign/" target="_blank" rel="noopener noreferrer">
              <Image 
                src="/imagens/redes_INS_icon_01.png"
                width={50}
                height={50}
                alt="Instagram"
              />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/wesleysilvaartdesign/" target="_blank" rel="noopener noreferrer">
              <Image 
                src="/imagens/redes_LIN_icon_01.png"
                width={50}
                height={50}
                alt="LinkedIn"
              />
            </a>
          </li>
          <li>
            <a href="https://github.com/wesleli" target="_blank" rel="noopener noreferrer">
              <Image 
                src="/imagens/redes_GIT_icon_01.png"
                width={50}
                height={50}
                alt="GitHub"
              />
            </a>
          </li>
          <li>
            <a href="https://wa.me/qr/B2XJ4SCQTXRZA1" target="_blank" rel="noopener noreferrer">
              <Image 
                src="/imagens/redes_WA_icon_01.png"
                width={50}
                height={50}
                alt="WhatsApp"
              />
            </a>
          </li>
        </ul>
      </div>
      
      {/* Informações Pessoais */}
      <div className="text-left md:text-center md:max-w-lg pt-5">
        <h1 className="text-4xl absolute left-0 font-bold text-gray-900 ml-5 md:ml-10">Wesley Silva</h1>
        <p className="text-lg font-semibold text-gray-300 leading-relaxed my-4 md:text-right md:max-w-lg p-8">
          Artista Interdisciplinar <br/>
          De Volta Redonda (RJ), Morando em Curitiba<br/>
          Conhecimento em Design e Programação<br/>
          Disponível para Trabalhos
        </p>
  
        <div className="data-square flex items-center">
          <Image src="/imagens/square.png" width={30} height={30} alt="square" />
          <h2 className="ml-2 text-lg text-gray-700">2023</h2>
        </div>
      </div>
      
      {/* Foto de Perfil */}
      <div className="fotoperfil">
        <Image 
          src="/imagens/FotoPerfil.png"
          width={540}
          height={530}
          alt="Foto de Perfil"
          className="rounded-lg"
        />
      </div>
    </div>
  </section>
  
}