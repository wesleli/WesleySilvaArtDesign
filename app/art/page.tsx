import { Links } from "../componentes/links"
import Conteiner from '../componentes/conteiner';


export default function Page() {

    return <div className="absolute p-6 font-mono bg-white bg-scroll h-full w-full text-black">
            <h1 className="ml-2 text-yellow-600">Arte.</h1>
                <div className="relative w-90 h-full">
                    <Links/>
                    <Conteiner/>
                </div>
            </div>

  }