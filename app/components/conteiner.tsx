'use client';

import Image from "next/image";
import Dialog from "./Dialog";
import Carousel from "./carousel";
import CarouselZoom from "./carouselzoom";
import Detalhes from "./detalhes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type Data = {
  id: string;
  nome: string;
  ano: string;
  url: string;
  description: string;
  categoria: string; 
};

type ConteinerProps = {
  parentId: string;
  selectedButton: string;
  productId: string;
  setSelectedButton: React.Dispatch<React.SetStateAction<string>>;
  setProductId: React.Dispatch<React.SetStateAction<string>>;
};

export default function Conteiner({
  parentId,
  selectedButton,
  productId,
  setSelectedButton,
  setProductId,
}: ConteinerProps) {
  const parentName: string = parentId;
  const [data, setData] = useState<Data[]>([]);
  const [isCarouselActive, setIsCarouselActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetch_api');
        const result = await response.json() as { products: Data[] };
  
        if (typeof result === 'object' && Array.isArray(result.products)) {
          console.log('Produtos recebidos:', result.products);
  
          // Aqui, usamos result.products em vez de result.product
          const filteredData = (result.products as Data[]).filter((product: Data) => {
            const match = product.categoria === parentId || (product.categoria === undefined && parentId === ''); // Add an additional check for undefined
            console.log(`Comparing ${product.categoria} with ${parentId}: ${match}`);
            return match;
          });
  
          console.log('Dados filtrados:', filteredData);
  
          setData(filteredData);
        } else {
          console.error("Os dados recebidos não contêm uma matriz:", result);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
  
    fetchData();
  }, [parentId]);
  

  const handleButtonClick = (pathname: any, dataId: string) => {
    router.push(pathname, undefined);
    setSelectedButton('segundoBotao'); 
    setProductId(dataId); 
  };

  async function onClose() {
    // Lógica ao fechar o modal
    console.log("modal has closed");
  }

  const onCarouselActivate = () => {
    setIsCarouselActive(true);
  };

  const onCarouselDeactivate = () => {
    setIsCarouselActive(false);
  };


  return (
    <div className="flex justify-between w-full pb-10">
      <div className="flex-col relative items-start justify-start w-9/12 p-2 bg-slate-100 border-t-4 border-white">
        <Dialog onClose={onClose}>
          <div>
            
            <CarouselZoom />
          </div>
        </Dialog>
            <div className="px-1">
              <Carousel />
            </div>
        {data.length === 0 ? (
          <ul className="flex items-center content-center justify-center grid-cols-4 w-full h-full">
          <div className="flex items-center justify-center text-xl font-bold text-gray-500">
            No works to show
          </div>
          </ul>
        
        ) : (
          <ul className="grid relative items-center content-center justify-center grid-cols-4 w-full">
            {data.map((dataItem) => (
              <li key={dataItem.id} className="m-1">
                <button
                  onClick={() => handleButtonClick(`/${parentName}?productId=${dataItem.id}`, dataItem.id)}
                  id="btncontent"
                  className={`flex relative w-full items-end justify-center hover:border-2 hover:border-zinc-700 ${
                    selectedButton === 'segundoBotao' && productId === dataItem.id ? 'active' : ''
                  }`}
                >
                  <Image
                    src={`/imagens/db/${parentName}/${dataItem.url}/capa.png`}
                    alt={dataItem.nome}
                    width={250}
                    height={250}
                  />
                  <div className="absolute block justify-center w-full opacity-0 text-yellow-200">
                    <p>{dataItem.nome}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex w-1/4 p-10 h-96 bg-slate-100 border-l-4 border-t-4 border-white mb-10">
        <Detalhes />
      </div>
    </div>
  );
}