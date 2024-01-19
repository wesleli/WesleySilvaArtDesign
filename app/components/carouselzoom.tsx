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

const CustomImage: React.FC<CustomImageProps> = ({ onError, fill, src, alt}) => {

  return (
    <Image
      src={src}
      fill={fill}
      alt={alt}
      onError={(e) => {
        onError(e);
        (e.target as HTMLImageElement).onerror = null;
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

export default function CarouselZoom () {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || '';
  const swiper = useSwiper();
  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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