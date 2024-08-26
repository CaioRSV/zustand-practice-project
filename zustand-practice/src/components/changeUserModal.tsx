import { useUser } from '@/states/userState';
import React, {useState, useEffect} from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

import { Input } from '@chakra-ui/react'
import { BiSolidEdit } from "react-icons/bi";

const ChangeUserModal = () => {
    const {data, changeData} = useUser();

    const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
        <BiSolidEdit className={`size-8 cursor-pointer text-blue-500`} onClick={()=>{setOpen(true)}} />

        <Modal isOpen={open} onClose={()=>{setOpen(false)}}>
        <ModalOverlay />
        <ModalContent minW={`40%`}>
          <ModalHeader>{`Modificando dados do usuário`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className={`p-2 flex flex-col justify-center gap-2`}>
            <div>
                <p className={`ml-1`}>Nome</p>
                <Input placeholder={data.name}
                    onChange={(e)=>{changeData({
                        name: e.target.value,
                        imageUrl: data.imageUrl,
                        age: data.age
                    })}}
                ></Input>
            </div>

            <div>
                <p className={`ml-1`}>Endereço da foto de perfil</p>
                <Input placeholder={data.imageUrl.length>40 ? data.imageUrl.slice(0,40)+"..." : data.imageUrl}
                    onChange={(e)=>{changeData({
                        name: data.name,
                        imageUrl: e.target.value,
                        age: data.age
                    })}}
                ></Input>
            </div>

            <div>
                <p className={`ml-1`}>{`Idade (opcional)`}</p>
                <Input placeholder={data.age?.toString() ?? "Não informado"}
                    onChange={(e)=>{changeData({
                        name: data.name,
                        imageUrl: data.imageUrl,
                        age: Math.max(parseInt(e.target.value),1) ?? undefined
                    })}}
                ></Input>
            </div>


          </ModalBody>

          <ModalFooter>
            <p className={`text-slate-400`}>As alterações são salvas automaticamente</p>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  )
}

export default ChangeUserModal