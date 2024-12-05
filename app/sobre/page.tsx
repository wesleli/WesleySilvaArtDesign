'use client';

import { useRouter } from "next/navigation";

export default function Sobre() {
  const router = useRouter();

  return (
    <section className="w-full h-screen flex flex-col justify-between p-4 md:p-8">
      {/* Cabeçalho com botão de volta */}
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => router.push('/')} // Botão para voltar à página inicial
          className="text-lg font-serif text-red-600 hover:text-hibiscus-red transition-colors"
        >
          Voltar
        </button>
      </div>

      {/* Seção "Sobre Mim" */}
      <div className="flex justify-center items-center flex-col text-center h-full">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-5">Sobre Mim</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
          Olá, meu nome é Wesley Silva, um profissional apaixonado por design, arte e tecnologia. Ao longo dos anos, venho explorando diferentes formas de expressão criativa, sempre buscando maneiras inovadoras de conectar minha prática artística com o mundo ao meu redor. Minha abordagem é multidisciplinar, envolvendo desde o design gráfico até projetos de arte colaborativa. Acredito no poder da arte para transformar ideias, despertar sentimentos e provocar reflexão. Estou sempre em busca de novos desafios e oportunidades para crescer como artista e designer, com o objetivo de criar projetos que ressoem com as pessoas de maneira significativa.
        </p>
      </div>

      {/* Rodapé com redes sociais */}
      <div className="flex justify-center items-center py-4">
        <button onClick={() => router.push('/')} className="text-lg font-serif text-red-600 hover:text-hibiscus-red transition-colors">
          Voltar para o Início
        </button>
      </div>
    </section>
  );
}