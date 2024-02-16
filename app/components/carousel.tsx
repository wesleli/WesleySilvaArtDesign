import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { EffectCreative, Keyboard, Navigation, Pagination} from 'swiper/modules';
import Image, { ImageLoader } from 'next/image';
import React, { SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../loading';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

type CustomImageProps = Omit<ImageLoader, 'src'> & {
  src: string;
  onError: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  alt: string;
  fill?: boolean;
};

const CustomImage: React.FC<CustomImageProps> = ({ onError, src, alt }) => {
  return (
    <Image
      layout="fill"
      objectFit='contain'
      objectPosition='center'
      quality={100}
      src={src}
      alt={alt}
      onError={(e) => {
        if (e instanceof ErrorEvent && e.target instanceof HTMLImageElement) {
          const img = e.target;
          if (img.naturalWidth === 0 && img.naturalHeight === 0) {
            console.error(`Error 404 while loading the image: ${src}`);
            return;
          }
        }

        onError(e);
        if (e.target) {
          (e.target as HTMLImageElement).onerror = null;
        }
      }}
    />
  );
};


type Conteudo = {
  id: string;
  tipo: string;
  caminho: string;
};

type Work = {
  id: string;
  tag: string[];
  nome: string;
  data: string;
  description: string;
  url: string;
  imagens: string[];
  categoria: string;
  conteudos: Conteudo[];
};

export default function Carousel(): JSX.Element | null {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || '';
  const zoomEnabled = !searchParams.has('zoom');
  const swiper = useSwiper();
  const [productData, setProductData] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  


  const handleZoomButtonClick = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('zoom', 'true');
    const updatedUrl: any = `${window.location.pathname}?${queryParams.toString()}`;
    router.replace(updatedUrl);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/fetch_api?id=${productId}`);
        const result = await response.json();

        if (result && result.work) {
          setProductData(result.work);
        } else {
          console.error("Received data does not contain a 'work' object:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchData();
    }
  }, [productId]);

  if (!productId) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  if (!productData) {
    return <div>não encontrado</div>;
  }


    return (
      <div className='swiper-container text-white widescreen-container mb-2  bg-slate-800/60 border-slate-800/60 border-2'>
          <div className="swiper-wrapper widescreen-inner h-3/4">
          {zoomEnabled && (
                  <button type="button" onClick={handleZoomButtonClick} className="absolute z-10 top-0 right-0 m-5 rounded-full bg-gray-800/80 p-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </button>
                )}
            <Swiper
          style={{ width: '100%', height: '100%' }}
          effect='creative'
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }}
          loop={true}
          navigation={true}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Keyboard, Pagination, Navigation, EffectCreative]}
        >
          {productData.conteudos.map((conteudo, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-slide-content flex justify-center items-center align-center h-full">
              {conteudo.tipo === 'imagem' ? (
                  <CustomImage
                    src={conteudo.caminho}
                    alt={productData.id}
                    onError={() => {
                      console.error(`Erro ao carregar a imagem ${conteudo.caminho}`);
                    }}
                  />
                  ) : conteudo.tipo === 'video' ? (
                <div className="w-full max-w-full h-full flex justify-center items-center">
                  <video controls className='max-w-full max-h-full py-7'>
                    <source src={conteudo.caminho} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                ) : (
                    <p>Tipo de conteúdo não suportado: {conteudo.tipo}</p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

          </div>
      </div>
    ); }

