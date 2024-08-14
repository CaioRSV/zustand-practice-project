'use client';

import { useImage } from '@/states/imageState';
import { useUser } from '@/states/userState';

import React, {useState} from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { ImSpinner } from "react-icons/im";


const ChangeImageModal = () => {
    const { image, changeImage } = useImage();
    const API_URL = "https://random.imagecdn.app/500/500";

    const [imageList, setImageList] = useState<string[]>([]);
    const [loadingImages, setLoadingImages] = useState<boolean>(false);

    const { data } = useUser();

    const [open, setOpen] = useState<boolean>(false);

    const fetchImages = async () => {
      setImageList([]);
      setLoadingImages(true);

      for(let i = 0;i<10;i++){
        await fetch(API_URL)
          .then(res => {
            return res.blob();
          })
          .then(data => {
              const url = URL.createObjectURL(data);
              setImageList((prev) => [...prev, url]);          
          })
      }

      setLoadingImages(false);

    }

  return (
    <div>

    <div className={`p-4 text-lg rounded-md bg-slate-800 text-slate-100 cursor-pointer`}
      onClick={()=>{setOpen(true);fetchImages();}}
    >Mudar imagem</div>

    <Modal isOpen={open} onClose={()=>{setOpen(false)}}>
        <ModalOverlay />
        <ModalContent minW={`40%`}>
          <ModalHeader>{`Imagem de: ${data.name}${data.age?`, usuário de ${data.age} ano${data.age>1?'s':''} de idade`:''}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className={`w-full flex flex-wrap justify-center`}>   
              {
                imageList.map((item, index)=> (
                  <div key={item+index}
                    className={`p-3 mb-3`}>
                    <img src={`${
                      item
                    }`}
                    className={`size-32 rounded-md cursor-pointer`}

                    onClick={()=>{
                      changeImage({
                        name: "Fetched Image Number "+index,
                        url: item,
                        size: 500
                    })
                  }}
                  
                    ></img>
                  </div>
                ))
              }

              {
                loadingImages
                  ?
                  <div className={`size-32 flex justify-center items-center animate-spin`}>
                    <ImSpinner className={`size-8`} />
                  </div>
                  :
                  <></>
              }
            </div>
          </ModalBody>

          <ModalFooter>
              {
                loadingImages
                  ?
                  <p>{`Carregando imagens - (${imageList.length}/10)`}</p>
                  :
                  <p className={`text-slate-400`}>Clique em uma das imagens para escolhê-la</p>
              }
          </ModalFooter>
        </ModalContent>
      </Modal>


    </div>
    
  )
}

export default ChangeImageModal