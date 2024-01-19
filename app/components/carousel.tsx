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
      src={src}
      fill={fill}
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
    <div className='conteiner text-white'>
      <ErrorBoundary>
        <Swiper
          className='h-full w-full'
          loop={true}
          navigation={true}
          pagination={{ type: 'fraction' }}
          modules={[Navigation, Pagination]}
          controller={{ control: swiper }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
            {productData.imagens.map((image, index) => (
              <SwiperSlide key={index}>
               <button onClick={handleZoomButtonClick} className="absolute z-10 justify-self-end top-0 right-0 m-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
              </svg>
              </button>
                {typeof image === 'string' && (
                  <CustomImage
                    src={`/imagens/db/design/${productData.url}/${image}.png`}
                    alt={productData.id}
                    fill={true}
                    // ou passar false conforme necessário
                    onError={() => {
                      console.error(`Erro ao carregar a imagem ${image}`);
                    }}
                  />
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </ErrorBoundary>
    </div>
  );
}
