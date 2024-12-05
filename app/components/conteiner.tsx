'use client';

import Image from "next/image";
import { useSearchParams, usePathname } from 'next/navigation';
import Dialog from "./Dialog";
import Carousel from "./carousel";
import Detalhes from "./detalhes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { app } from '@/firebase';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';


type Data = {
  id: string;
  nome: string;
  data: string;
  tag: string;
  url: string;
  description: string;
  categoria: string; 
  texto: string;
};

type ConteinerProps = {
  parentId: string;
  selectedButton: string;
  productId: string | null;
  setSelectedButton: React.Dispatch<React.SetStateAction<string>>;
  setProductId: React.Dispatch<React.SetStateAction<string | null>>;
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
  const productIdFromParams = searchParams.get('trabalho');
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const storage = getStorage(app);

  



  useEffect(() => {
    async function fetchData() {
     
      setLoading(true);

      try {
        const response = await fetch('/api/fetch_api');
        const result = await response.json() as { works: Data[] };

        if (Array.isArray(result.works)) {
          let filteredData = result.works.filter(work => work.categoria === parentId);

          const tag = searchParams.get('tag');
          if (tag) {
            filteredData = filteredData.filter(work => work.tag.includes(tag));
          }

          filteredData.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

          if (productId) {
            const index = filteredData.findIndex(item => item.id === productId);
            if (index !== -1) {
              const selectedItem = filteredData.splice(index, 1);
              filteredData.unshift(selectedItem[0]);
            }
          }

          setData(filteredData);

          if (filteredData.length > 0) {
            const selectedWork = filteredData[0];
            if (selectedWork.texto) {
              setSelectedText(selectedWork.texto);
              setSelectedName(selectedWork.nome);
            }
          } else {
            setSelectedText(null);
            setSelectedName(null);
          }
        } else {
          console.error('Invalid data format received:', result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [parentId, productId, searchParams]);

  const handleButtonClick = (pathname: any, dataId: any) => {
    router.push(pathname);
    setSelectedButton('segundoBotao');
    setProductId(dataId);
    setSelectedText(null);
    setSelectedName(null);
  };

  

  



  return (
<div className="flex flex-col-reverse md:inline-flex md:flex-row justify-between w-full pb-10">

<div className="flex-col relative items-start justify-start w-full md:w-4/6 p-2 bg-gray-200 mt-2">
  <Dialog />
  <Carousel />
  { productIdFromParams && selectedText && (
      <div className="p-6 bg-white border items-center justify-center mb-2 border-gray-300 rounded shadow">
        <h2 className="text-lg text-center font-bold mb-4">{selectedName}</h2>
        <div
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: selectedText }}
        />
      </div>
    )}
  <div>

    
  </div>
  {loading ? (
    <div className="flex items-center justify-center text-xl font-bold text-gray-500">
      Loading...
    </div>
  ) : data.length === 0 ? (
    <div className="flex items-center justify-center text-xl font-bold text-gray-500">
      No works to show
    </div>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
      {data.map((dataItem) => (
        <div key={dataItem.id} className="grid m-0">
          <button
            onClick={() => handleButtonClick(`/${parentName}?trabalho=${dataItem.id}`, dataItem.id)}
            id="btncontent"
            className={`relative w-full hover:border-2 hover:border-slate-500 ${selectedButton === 'segundoBotao' && productId === dataItem.id ? 'active' : ''}`}
          >
            <div>
              <Image
                src={`https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/${encodeURIComponent(parentName)}%2F${encodeURIComponent(dataItem.url)}%2Fcapa.png?alt=media`}
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

<div className="flex w-full md:w-2/6 bg-gray-200 md:ml-2 mt-2">
  <Detalhes/>
</div>

</div>
  )}