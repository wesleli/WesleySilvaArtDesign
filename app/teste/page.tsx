"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image"

const ImageGallery: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); // Estado de erro

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/getArquivo');
                const data = await response.json();
                
                if (Array.isArray(data.images)) {
                    setImages(data.images);
                } else {
                    setError("A propriedade 'images' não é um array.");
                }
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar imagens:", error);
                setError("Erro ao buscar imagens.");
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Galeria de Imagens</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : error ? ( // Exibir mensagem de erro se houver
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((url, index) => (
                        <div key={index} className="w-full h-64 bg-gray-200 relative">
                        <Image 
                            src={url} 
                            alt={`Imagem ${index + 1}`} 
                            layout="fill"
                            objectFit="cover" 
                            className="rounded-md"
                        />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;