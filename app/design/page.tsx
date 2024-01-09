import { Links } from "../componentes/links"
import Conteiner from '../componentes/conteiner';


export default function Page() {

    return <div className="p-6 font-mono h-full items-center justify-center bg-white text-black">
            <h1 className="ml-2 text-yellow-600">Design.</h1>
                <div className="block justify-center w-full h-full mb-10">
                    <Links/>
                    <Conteiner/>
                </div>
            </div>

  }