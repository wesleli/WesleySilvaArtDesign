import { useRouter } from "next/navigation";

export default function Portfolio () {

    const router = useRouter();

    return <section id="portfolio" className="container mx-auto flex flex-col justify-center h-screen px-4 bg-white relative">
    <div className="absolute top-8 left-8">
      <h1 className="text-5xl font-bold text-gray-900 tracking-wide uppercase">Portfólio</h1>
    </div>
    <div className="w-full flex flex-col items-center justify-center mt-24">
      <div className="w-full max-w-lg flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <button 
          className="text-2xl font-semibold text-gray-900 bg-transparent hover:text-gray-700 w-full md:w-1/2 py-4 transition duration-300 ease-in-out"
          type="button" 
          onClick={() => router.push('/arte')}
        >
          Arte
        </button>
        <button 
          className="text-2xl font-semibold text-gray-900 bg-transparent hover:text-gray-700 w-full md:w-1/2 py-4 transition duration-300 ease-in-out"
          type="button" 
          onClick={() => router.push('/design')}
        >
          Design
        </button>
      </div>
    </div>
  </section>
  
}