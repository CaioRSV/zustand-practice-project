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

const ChangePopUp = () => {
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
        <ModalContent>
          <ModalHeader>{`Imagem de: ${data.name} ${data.age?`, de ${data.age} anos de idade`:''}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              imageList.map((item, index)=> (
                <div key={item+index}
                
                onClick={()=>{
                    changeImage({
                      name: "Fetched Image Number "+index,
                      url: item,
                      size: 500
                  })
                }}
                >
                  {item}
                </div>
              ))
            }
          </ModalBody>

          <ModalFooter>
            <p onClick={()=>{
        changeImage({
            name: "Blue Feather",
            url: "https://www.color-meanings.com/wp-content/uploads/2022/12/blue-feather.png",
            size: 600
        })
    }} 
    >disoaidosds</p>
          </ModalFooter>
        </ModalContent>
      </Modal>


    </div>
    
  )
}

export default ChangePopUp