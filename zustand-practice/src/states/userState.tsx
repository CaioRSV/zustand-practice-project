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
    data: { name: "", age: undefined, imageUrl: "" },
    changeData: (to: UserData) =>
        set((state) => ({
            data: {
                name: to.name,
                age: to.age?to.age:undefined,
                imageUrl: to.imageUrl,
            }
        })),
}));
