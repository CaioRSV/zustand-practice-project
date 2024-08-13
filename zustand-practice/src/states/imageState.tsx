import { create } from 'zustand'

interface image{
    name: string;
    url: string;
    size: number;
}

interface imageState{
    image: image;
    changeImage: (to: image) => void;
}

export const useImage = create<imageState>((set) => ({
  image: {name: "", url: "", size: 0},
  changeImage: (to:image) => set((state) => ({image: {
    name: to.name,
    url: to.url,
    size: to.size
  }}))
}));
