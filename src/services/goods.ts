import { toggleLikeGoodsParamsType } from '@/types/goods';
import axios from 'axios';

export const getGoods = async (order: string) => {
  const response = await axios.get(`/api/goods?order=${order}`);
  return response.data;
};

export const getLikedGoodsByUser = async (user_id: string) => {
  const response = await axios.get(`/api/goods/like?user_id=${user_id}`);
  return response.data;
};

export const getIsLikeOfGoodsByUser = async (
  goods_id: string,
  user_id: string,
) => {
  const response = await axios.get(
    `/api/goods/${goods_id}/like?user_id=${user_id}`,
  );
  console.log(response);
  return response.data;
};

export const toggleLikeGoods = async (
  toggleLikeGoodsParams: toggleLikeGoodsParamsType,
) => {
  const { goods_id, user_id, isLiked } = toggleLikeGoodsParams;
  if (!isLiked || isLiked.length) {
    const response = await axios.delete(
      `/api/goods/${goods_id}/like?user_id=${user_id}`,
    );
    return response;
  } else {
    const response = await axios.post(
      `/api/goods/${goods_id}/like?user_id=${user_id}`,
    );
    return response;
  }
};

export const getCartList = async (user_id: string) => {
  const response = await axios.get(`/api/goods/cart/${user_id}`);
  console.log(response);
  return response.data;
};
