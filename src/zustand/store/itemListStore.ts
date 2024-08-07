import { ItemToBuyType } from '@/types/goods';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ItemListType = {
  itemList: ItemToBuyType[] | [];
  setItemList: (itemList: ItemToBuyType[] | []) => void;
};

const useItemListStore = create<ItemListType>()(
  persist(
    (set) => ({
      itemList: [],
      setItemList: (itemList) => set({ itemList }),
    }),
    {
      name: 'itemList',
      getStorage: () => sessionStorage,
    },
  ),
);

export default useItemListStore;