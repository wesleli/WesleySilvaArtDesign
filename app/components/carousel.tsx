import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image, { ImageLoader } from 'next/image';
import React, { ErrorInfo, ReactNode, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type CustomImageProps = Omit<ImageLoader, 'src'> & {
  src: string;
  onError: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  alt: string;
  fill?: boolean;
};


const CustomImage: React.FC<CustomImageProps> = ({ onError, fill, src, alt }) => {
  return (
    <Image
      fill
      src={src}
      alt={alt}
      onError={(e) => {
        // Verifica se o erro é 404 (Not Found)
        if (e instanceof ErrorEvent && e.target instanceof HTMLImageElement) {
          const img = e.target;
          if (img.naturalWidth === 0 && img.naturalHeight === 0) {
            // Lida com o erro 404 aqui (por exemplo, exibindo uma imagem de substituição)
            console.error(`Erro 404 ao carregar a imagem: ${src}`);
            // Exibir uma imagem de substituição ou fazer algo apropriado
            return;
          }
        }

        // Chama a função de erro fornecida
        onError(e);
        // Remove o manipulador de erro para evitar loops infinitos
        if (e.target) {
          (e.target as HTMLImageElement).onerror = null;
        }
      }}
    />
  );
};


type Product = {
  id: string;
  nome: string;
  ano: string;
  description: string;
  url: string;
  imagens: string[];
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

const ErrorFallback = () => {
  const router = useRouter();

  return (
    <div>
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <button onClick={() => router.push('/')}>Ir para a página inicial</button>
    </div>
  );
};



export default function Carousel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || '';
  const swiper = useSwiper();
  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [swiperWidth, setSwiperWidth] = useState(100);



  const handleZoomButtonClick = () => {
    // Get the current query parameters
    const queryParams = new URLSearchParams(window.location.search);
  
    // Add the new parameter 'zoom' with a value (e.g., '2x') to the query
    queryParams.set('zoom', 'true');
  
    // Build the new URL with updated query parameters
    const updatedUrl: any = `${window.location.pathname}?${queryParams.toString()}`;
  
    // Replace the current URL with the updated one
    router.replace(updatedUrl);
  };

  

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(`/api/fetch_api?id=${productId}`);
        const result = await response.json();

        if (typeof result === 'object' && result.product) {
          setProductData(result.product);
          setError(false);
        } else {
          console.error("Os dados recebidos não contêm um objeto 'product':", result);
          setError(true);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (searchParams.get('productId')) {
      fetchData();
    } else {
      setProductData(null);
    }
  }, [searchParams, productId]);

  if (!productId) {
    return null;
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error || !productData) {
    return (
      <ErrorBoundary>
        <ErrorFallback />
      </ErrorBoundary>
    );
  }

    return (
      <div className='swiper-container text-white px-2 widescreen-container'>
        <ErrorBoundary>
          <div className="swiper-wrapper widescreen-inner">
            <Swiper
              style={{ width: '100%', height: '100%' }}
              loop={true}
              navigation={true}
              pagination={{ type: 'fraction' }}
              modules={[Navigation, Pagination]}
              controller={{ control: swiper }}
          
            >
              {productData.imagens.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-slide-content">
                    <button onClick={handleZoomButtonClick} className="absolute z-10 top-0 right-0 m-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                    </button>
                    {typeof image === 'string' && (
                      <CustomImage
                        src={`/imagens/db/design/${productData.url}/${image}.png`}
                        alt={productData.id}
                        fill={true}
                        onError={() => {
                          console.error(`Erro ao carregar a imagem ${image}`);
                        }}
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </ErrorBoundary>
      </div>
    ); }

