'use client';

import React, {useState, useEffect} from 'react';

import ChangeImageModal from "@/components/changeImageModal";
import ChangeUserModal from '@/components/changeUserModal';

import { useImage } from "@/states/imageState";

import { ChakraProvider } from '@chakra-ui/react'
import { useUser } from '@/states/userState';

import { ImSpinner } from "react-icons/im";

import TaskArea from '@/components/taskArea';


export default function Home() {
  const { data , changeData} = useUser();
  const { image, changeImage } = useImage();

  const [imageLoading, setImageLoading] = useState<boolean>(false);

  useEffect(() => {
    setImageLoading(true);
    changeImage({
      name: "Red Leaf",
      url: "https://img.freepik.com/fotos-gratis/beleza-abstrata-de-outono-em-padrao-multicolorido-de-veios-de-folhas-gerado-por-ia_188544-9871.jpg",
      size: 400
    })
    setImageLoading(false);
  }, [])

  return (
    <ChakraProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className={`p-2 bg-slate-100 rounded-md flex-col justify-center items-center min-w-32`}>
          <p className={`w-full flex justify-center mb-1`}>{data.name}{`${data.age ? ` (${data.age} ano${data.age>1?'s':''})` : ''}`}</p>
          <div className={`w-full flex justify-center`}>
            <img className={`size-16 rounded-full bg-slate-200`} src={data.imageUrl}></img>
          </div>

          <div className={`w-full p-1 flex justify-center`}>
            <ChangeUserModal/>
          </div>

        </div>

        <div className={`min-w-32 min-h-32 m-2 border-1 rounded-md`}>
          <TaskArea/>
        </div>
        
        {
          imageLoading
            ?
            <div className={`size-64 flex justify-center items-center animate-spin`}>
              <ImSpinner className={`size-8`} />
            </div>
            :
            <img 
            src={`${image.url}`} 
            className={`object-cover size-[${image.size}px] rounded-md m-5`}/>
        }

        <ChangeImageModal/>
      </main>

    </ChakraProvider>
  );
}
