import { create } from 'zustand';

interface UserData {
    name: string;
    age?: number;
    imageUrl: string;
}

interface UserState{
    data: UserData;
    changeData: (to: UserData) => void;
}


export const useUser = create<UserState>((set) => ({
    data: { 
        name: "Usuário sem nome", 
        age: undefined, 
        imageUrl: "https://cdn1.iconfinder.com/data/icons/programing-development-8/24/react_logo-512.png" },
    changeData: (to: UserData) =>
        set((state) => ({
            data: {
                name: to.name,
                age: to.age?to.age:undefined,
                imageUrl: to.imageUrl,
            }
        })),
}));
