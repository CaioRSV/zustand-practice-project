'use client';

import React, {useState, useEffect} from 'react';

import ChangePopUp from "@/components/changePopUp";

import { useImage } from "@/states/imageState";

import { ChakraProvider } from '@chakra-ui/react'

export default function Home() {
  const { image, changeImage } = useImage();

  useEffect(() => {
    changeImage({
      name: "Red Leaf",
      url: "https://img.freepik.com/fotos-gratis/beleza-abstrata-de-outono-em-padrao-multicolorido-de-veios-de-folhas-gerado-por-ia_188544-9871.jpg",
      size: 400
    })
  }, [])

  return (
    <ChakraProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p>Nome a ser definido e modificado no parent component</p>
        <img 
        src={`${image.url}`} 
        className={`size-64`}/>

        <ChangePopUp></ChangePopUp>
      </main>
    </ChakraProvider>
  );
}
