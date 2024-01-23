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
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetch_api');
        const result = await response.json() as { products: Data[] };
  
        if (typeof result === 'object' && Array.isArray(result.products)) {
  
          // Aqui, usamos result.products em vez de result.product
          const filteredData = (result.products as Data[]).filter((product: Data) => {
            const match = product.categoria === parentId || (product.categoria === undefined && parentId === ''); // Add an additional check for undefined
            return match;
          });
  
  
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



  return (
<div className="inline-flex md:flex-row justify-between w-full pb-10">

<div className="flex-col relative items-start justify-start w-4/6 p-2 bg-gray-200 mt-2">
  <Dialog >
    <div>
      <CarouselZoom />
    </div>
  </Dialog>
  <div>
    <Carousel />
  </div>
  {data.length === 0 ? (
    <div className="flex items-center justify-center text-xl font-bold text-gray-500">
      No works to show
    </div>
  ) : (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((dataItem) => (
        <li key={dataItem.id} className="mb-4 md:mb-0 relative p-2">
          <button
            onClick={() => handleButtonClick(`/${parentName}?productId=${dataItem.id}`, dataItem.id)}
            id="btncontent"
            className={`relative w-full aspect-w-1 aspect-h-1 hover:border-2 hover:border-slate-500 ${selectedButton === 'segundoBotao' && productId === dataItem.id ? 'active' : ''}`}
          >
            <div className="aspect-w-1 aspect-h-1">
              <Image
                src={`/imagens/db/${parentName}/${dataItem.url}/capa.jpg`}
                alt={dataItem.nome}
                width={500}
                height={500}
                objectFit="cover"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-2 bg-black bg-opacity-40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm font-semibold">{dataItem.nome}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

<div className="flex w-2/6 bg-gray-200 ml-2 mt-2">
  <Detalhes />
</div>

</div>
  )}