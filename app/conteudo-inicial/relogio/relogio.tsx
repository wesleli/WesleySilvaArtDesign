
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Relogio() {

    const [data, setData] = useState(new Date());
    const [backgroundImage, setBackgroundImage] = useState('');
    const [screenSize, setScreenSize] = useState('');
    const [fraseMotivacional, setFraseMotivacional] = useState('');
    const [selectedFrase, setSelectedFrase] = useState(null);


    useEffect(() => {
      const updateBackgroundImage = () => {
        const currentHour = data.getHours();
        const screenWidth = window.innerWidth;

        setScreenSize(screenWidth < 820 ? '02' : '01');

        const fraseHour = [
          { period: '01', frase: (<><p>“Sou onde não penso, penso onde não sou.”<br />Lacan, J</p></>), startHour: 6, endHour: 17 },
          { period: '02', frase: (<><p><style jsx>{` p {color: #d9e1f9;}`}</style>Vá para casa</p><p><style jsx>{` p {color: #d9e1f9;}`}</style>Tome um chá</p></>), startHour: 18, endHour: 23 },
          { period: '03', frase: (<><p><style jsx>{` p {color: #d9e1f9;}`}</style>...</p></>), startHour: 0, endHour: 5 },
        ];

        const firstSelectedFrase = fraseHour.find(frases => currentHour >= frases.startHour && currentHour <= frases.endHour);

        setSelectedFrase(firstSelectedFrase || null)

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

    useEffect(() => {
      // Atualize fraseMotivacional aqui, fora do primeiro useEffect
      if (selectedFrase) {
        setFraseMotivacional(selectedFrase.frase);
      }
    }, [selectedFrase]);


    useEffect(() => {
      const tiktok = document.querySelector('.tiktok');
      const makeClock = setInterval(() => {
        tiktok.style.animationPlayState = tiktok.style.animationPlayState === 'running' ? 'paused' : 'running';
      }, 1000);

      return () => clearInterval(makeClock);
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
                              {fraseMotivacional}
                      </div>
                      <div className="button-topo">
                        <a href="#conteudo-01"><Image src="/imagens/icon_topo.png" width={75}
                            height={65}
                            alt="Topo"></Image></a>

                    </div>
    </section>
}