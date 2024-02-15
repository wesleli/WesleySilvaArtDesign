"use client";

import { useSearchParams, usePathname } from 'next/navigation';
import { useRef, useEffect, useState, Children, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Carousel from './carousel';


export default function Dialog() {
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const url: any = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Verifica se ambos os parâmetros 'productId' e 'outroParam' estão presentes na URL
  const showDialog = searchParams.has('productId') && searchParams.has('zoom');

  useEffect(() => {
    if (showDialog) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();

    // Create a new instance of URLSearchParams with the updated parameters
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.delete('zoom');

    // Build the new URL with updated query parameters
    const updatedUrl: any = `${url}?${updatedSearchParams.toString()}`;

    // Navigate to the previous page
    router.replace(updatedUrl);
  };

  return (
    <dialog ref={dialogRef} className="fixed bg-transparent w-4/6 top-50 left-50 -translate-x-50 -translate-y-50 z-10 backdrop:bg-gray-800/80">
      <div className='flex'>
          <div>
                <button className="absolute z-10 right-0 mr-5 mt-2 text-white rounded-lg" style={{backgroundColor: '#50505081'}} onClick={closeDialog}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
                </button>
        </div>
        
          <Carousel/>
        </div>
    </dialog>
  );
}