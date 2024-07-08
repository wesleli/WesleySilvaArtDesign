'use client'

import Inicio from "./conteudo-inicial/inicio/inicio"
import Sobremim from "./conteudo-inicial/sobremim/sobremim"
import Relogio from "./conteudo-inicial/relogio/relogio"
import Portfolio from "./conteudo-inicial/portfolio/portfolio"

export default function Page() {


    return <div className="h-full w-fulf">
                <Inicio></Inicio>
                <Portfolio></Portfolio>
                <Sobremim></Sobremim>
                <Relogio></Relogio>
            </div>

  }