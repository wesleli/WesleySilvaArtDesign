
import '/app/normalize.css';
import '@/app/globals.css';
import Loading from './loading';


import { Metadata } from 'next'
import { Suspense } from 'react';
 
export const metadata: Metadata = {
  title: 'Wesley Silva',
  description: 'Artista interdisciplinar: Artes, Design e programação.'
}



export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    

    return (
      <html lang="pt" className='scroll-smooth'>
        <head>
        <link rel="icon" href="https://img.icons8.com/?size=100&id=z319sFhd46s4&format=png&color=F42B2B" sizes="any" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
          <link href="https://fonts.googleapis.com/css2?family=Climate+Crisis&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Rubik+Broken+Fax&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>
        </head>
        <body className="relative h-screen w-full">
        <Suspense fallback={<Loading />}>
        <Loading />
            {children}
        </Suspense>
      </body>

      </html>
    )
  }
