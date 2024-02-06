'use client'

import { useEffect, useState } from "react";



const Loading: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    if (!loading) return; // Não atualize a porcentagem de carregamento se o carregamento já estiver concluído
    
    const timer = setInterval(() => {
      setLoadingPercentage((prevPercentage) => {
        // Aumenta a porcentagem de carregamento gradualmente
        const nextPercentage = prevPercentage + 1;
        // Se a porcentagem de carregamento exceder 100, limpa o intervalo
        if (nextPercentage >= 100) {
          clearInterval(timer);
        }
        return nextPercentage;
      });
    }, 20); // Define o intervalo de atualização da porcentagem de carregamento (em milissegundos)
    
    // Limpando o timer
    return () => clearInterval(timer);
  }, [loading]);

  return loading ? (
    <div className="loader" >
      <div className="redLight" style={{ left: `${loadingPercentage}%` }}></div> {/* Luz vermelha */}
    </div>
  ) : null;
};

export default Loading;
