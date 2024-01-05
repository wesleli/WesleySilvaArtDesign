
import '@/app/globals.css';

import { Metadata } from 'next'
 
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
      <html lang="en" className='scroll-smooth'>
        <head>
          
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
          <link href="https://fonts.googleapis.com/css2?family=Climate+Crisis&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Rubik+Broken+Fax&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet"></link>

        </head>
        <body>{children}</body>
      </html>
    )
  }