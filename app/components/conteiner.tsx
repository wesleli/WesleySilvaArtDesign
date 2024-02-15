'use client';

import Image from "next/image";
import Dialog from "./Dialog";
import Carousel from "./carousel";
import Detalhes from "./detalhes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

type Data = {
  id: string;
  nome: string;
  data: string;
  tag: string;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch('/api/fetch_api');
        const result = await response.json() as { works: Data[] };

        if (typeof result === 'object' && Array.isArray(result.works)) {
          let filteredData = result.works.filter(work => work.categoria === parentId);
          const tag = searchParams.get('tag');

          if (tag) {
            // Filtrar os dados por tag, verificando se a tag da URL está presente no array de tags
            filteredData = filteredData.filter(work => work.tag.includes(tag));
          }
          console.log(tag)
          console.log("Dados após filtro por tag:", filteredData);

          filteredData.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

          if (productId) {
            const index = filteredData.findIndex(item => item.id === productId);
            if (index !== -1) {
              const selectedItem = filteredData.splice(index, 1);
              filteredData.unshift(selectedItem[0]);
            }
          }

          setData(filteredData);
        } else {
          console.error("Os dados recebidos não contêm uma matriz:", result);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [parentId, productId, searchParams]);

  const handleButtonClick = (pathname: any, dataId: string) => {
    router.push(pathname);
    setSelectedButton('segundoBotao'); 
    setProductId(dataId); 
  };


  return (
<div className="inline-flex md:flex-row justify-between w-full pb-10">

<div className="flex-col relative items-start justify-start w-4/6 p-2 bg-gray-200 mt-2">
  <Dialog />
    <Carousel />
  {loading ? (
    <div className="flex items-center justify-center text-xl font-bold text-gray-500">
      Loading...
    </div>
  ) : data.length === 0 ? (
    <div className="flex items-center justify-center text-xl font-bold text-gray-500">
      No works to show
    </div>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-1 m-0">
      {data.map((dataItem) => (
        <div key={dataItem.id} className="grid m-0">
          <button
            onClick={() => handleButtonClick(`/${parentName}?productId=${dataItem.id}`, dataItem.id)}
            id="btncontent"
            className={`relative w-full hover:border-2 hover:border-slate-500 ${selectedButton === 'segundoBotao' && productId === dataItem.id ? 'active' : ''}`}
          >
            <div>
              <Image
                src={`/imagens/db/${parentName}/${dataItem.url}/capa.png`}
                placeholder="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                alt={dataItem.nome}
                width={500}
                height={500}
                objectFit="cover"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm font-semibold">{dataItem.nome}</p>
            </div>
          </button>
        </div>
      ))}
    </div>
  )}
</div>

<div className="flex w-2/6 bg-gray-200 ml-2 mt-2">
  <Detalhes/>
</div>

</div>
  )}