
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Frase {
  text: string;
  color: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}




export default function Relogio() {


    const [data, setData] = useState(new Date());
    const [backgroundImage, setBackgroundImage] = useState('');
    const [screenSize, setScreenSize] = useState('');
    const [frases, setFrases] = useState<Frase[]>([]);

    const handleButtonClick = () => { 
      const element = document.getElementById('conteudo-01');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
     };


    useEffect(() => {
      const updateBackgroundImage = () => {
        const currentHour = data.getHours();
        const screenWidth = window.innerWidth;

        setScreenSize(screenWidth < 820 ? '02' : '01');

        const images = [
          { period: 'morning', url: `/imagens/relogio-dia-${screenSize}.png`, startHour: 6, endHour: 17 },
          { period: 'night', url: `/imagens/relogio-noite-${screenSize}.png`, startHour: 18, endHour: 23 },
          { period: 'night2', url: `/imagens/relogio-noite-${screenSize}.png`, startHour: 0, endHour: 5 },
        ];
  
        const selectedImage = images.find(image => currentHour >= image.startHour && currentHour <= image.endHour);
  
        if (selectedImage) {
          setBackgroundImage(`url(${selectedImage.url})`);
          // Não atualize o estado aqui para evitar recursividade infinita
          // setFraseMotivacional(selectedFrase.frase);
        }
      };
  
      updateBackgroundImage();
  
      window.addEventListener('resize', updateBackgroundImage);
  
      const intervalId = setInterval(updateBackgroundImage, 1000);
  
      return () => {
        clearInterval(intervalId);
        window.removeEventListener('resize', updateBackgroundImage);
      };
    }, [data, screenSize]);

      // Atualize fraseMotivacional aqui, fora do primeiro useEffect
      useEffect(() => {
        const currentHour = new Date().getHours();
    
        if (currentHour >= 6 && currentHour <= 17) {
          setFrases([
            { text: '“Sou onde não penso, penso onde não sou."', color: '#1a2058', textAlign: 'left' },
            { text: 'Lacan, J.', color: '#1a2058', textAlign: 'right' },
          ]);
        } else if (currentHour >= 18 && currentHour <= 23) {
          setFrases([
            { text: 'Vá para casa.', color: '#cedff2', textAlign: 'center' },
            { text: 'Tome um chá.', color: '#cedff2', textAlign: 'center' },
          ]);
        } else {
          setFrases([
            { text: '...', color: '#cedff2', textAlign: 'center' },
          ]);
        }

      const intervalId = setInterval(() => {
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

    useEffect(() => {
      const tiktok = document.querySelector('.tiktok') as HTMLElement | null;;

      if (tiktok) {
        const makeClock = setInterval(() => {
          tiktok.style.animationPlayState = tiktok.style.animationPlayState === 'running' ? 'paused' : 'running';
        }, 1000);
    
        return () => clearInterval(makeClock);
      }
    
      return undefined;

    }, []);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setData(new Date());
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    const dia = data.getDate().toString().padStart(2, '0');
    const mesnumber = data.getMonth();
    const mes = (mesnumber + 1).toString().padStart(2, '0');
    const hour = data.getHours().toString().padStart(2, '0');
    const minutes = data.getMinutes().toString().padStart(2, '0');


    return <section id="conteudo-05" style={{backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',}}>
                      <div className='nameoclock'>
                        <div className='clock'>
                            <div className='baserelogio'><Image className='tiktok' src={'/imagens/tiktok.png'} width={180} height={180} alt='tiktok'></Image></div>
                            <p className='data'>{dia}{'.'+mes}</p>
                            <p className='hour'>{hour}:{minutes}</p>
                            <Image className='ponteiro' src={'/imagens/ponteiro.png'} width={310} height={360} alt='tiktok'></Image>
                        </div>
                      </div>
                      <div className='frasemotivacional'>
                              {frases.map((frase, index) => (
                            <p key={index} style={{ color: frase.color, textAlign: frase.textAlign }}>
                            {frase.text}
                              </p>
                                 ))}
                       </div>
                      <div className="button-topo">
                        <button type='button' onClick={handleButtonClick}><Image src="/imagens/icon_topo.png" width={75}
                            height={65}
                            alt="Topo"></Image></button>

                    </div>
    </section>
}