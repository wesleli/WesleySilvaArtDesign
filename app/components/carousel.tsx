import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Keyboard, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { app } from '@/firebase';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

const Loading: React.FC = () => (
  <div className="loading-container">
    <div className="loading-balls">
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
    </div>
  </div>
);

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
  const productId = searchParams.get('trabalho') || '';
  const zoomEnabled = !searchParams.has('zoom');
  const [productData, setProductData] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<{ url: string; isVideo: boolean }[]>([]);
  const [isImageLoading, setIsImageLoading] = useState(true); // Para controlar o carregamento

  const handleZoomButtonClick = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('zoom', 'true');
    const updatedUrl: any = `${window.location.pathname}?${queryParams.toString()}`;
    router.replace(updatedUrl);
  };

  const fetchMediaFromFirebase = async (categoria: string, url: string) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `/${categoria}/${url}/`);

    const isVideoUrl = (url: string): boolean => {
      const fileName = url.split('?')[0];
      const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];
      return videoExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
    };

    try {
      const result = await listAll(storageRef);
      const mediaUrls = await Promise.all(
        result.items.map(async (item) => {
          const mediaUrl = await getDownloadURL(item);
          const isVideo = await isVideoUrl(mediaUrl);
          return { url: mediaUrl, isVideo };
        })
      );
      setMediaUrls(mediaUrls);
      setIsImageLoading(false); // Marque como não carregando após buscar as imagens
    } catch (error) {
      console.error('Erro ao buscar mídias do Firebase:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/fetch_api?id=${productId}`);
        const result = await response.json();

        if (result && result.work) {
          setProductData(result.work);
          if (result.work.categoria && result.work.url) {
            setIsImageLoading(true); // Começa o carregamento
            fetchMediaFromFirebase(result.work.categoria, result.work.url);
          }
        } else {
          console.error("Dados inválidos:", result);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchData();
    }
  }, [productId]);

  useEffect(() => {
    if (mediaUrls.length > 0) {
      setSwiperInitialized(true);
    }
  }, [mediaUrls]);

  if (!productId) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  if (!productData) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="swiper-container text-white justify-self-center self-center items-center justify-items-center widescreen-container">
      <div
        style={{ boxSizing: 'border-box' }}
        className="swiper-wrapper justify-self-center self-center items-center justify-items-center widescreen-inner bg-slate-800/60 border-slate-800/60 border-2 mb-2"
      >
        {zoomEnabled && (
          <button
            type="button"
            onClick={handleZoomButtonClick}
            className="absolute z-10 top-0 right-0 m-5 p-2 rounded-full bg-gray-800/80 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 md:w-6 md:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </button>
        )}
        {swiperInitialized && (
          <Swiper
            style={{ width: '100%', height: '100%' }}
            effect="creative"
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }}
            loop={mediaUrls.length > 1}
            navigation={true}
            keyboard={{ enabled: true }}
            pagination={{ clickable: true }}
            modules={[Keyboard, Pagination, Navigation, EffectCreative]}
          >
            {mediaUrls.map(({ url, isVideo }, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-slide-content flex justify-center items-center align-center h-full">
                  {isImageLoading && (
                    <div className="loading-animation absolute inset-0 flex justify-center items-center">
                      <div className="spinner">Loading...</div>
                    </div>
                  )}
                  {isVideo ? (
                    <video
                      controls
                      className="w-full h-full"
                      src={url}
                      onError={() => console.error(`Erro ao carregar o vídeo ${url}`)}
                      onLoadedData={() => setIsImageLoading(false)} // Marca como carregado quando o vídeo estiver pronto
                    >
                      <p>Não foi possível reproduzir o vídeo.</p>
                    </video>
                  ) : (
                    <Image
                      src={url}
                      alt={`Mídia ${index + 1}`}
                      fill
                      sizes="100vw"
                      style={{ objectFit: 'contain' }}
                      quality={100}
                      onError={() => console.error(`Erro ao carregar a imagem ${url}`)}
                      onLoadingComplete={() => setIsImageLoading(false)} // Marca como carregado quando a imagem estiver pronta
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

