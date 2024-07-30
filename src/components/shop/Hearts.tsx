'use client';

import {
  useGetIsLikedGoodsByUser,
  useToggleLikeGoods,
} from '@/hooks/goodsHooks';
import { toggleLikeGoodsParamsType } from '@/types/goods';
import { IoHeart } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';

interface HeartsProps {
  goods_id: string;
  user_id: string;
}

function Hearts({ goods_id, user_id }: HeartsProps) {
  const {
    data: isLiked,
    isError,
    isPending,
  } = useGetIsLikedGoodsByUser(goods_id, user_id);

  const { mutate: likeMutate } = useToggleLikeGoods(
    goods_id,
    user_id,
    isLiked!,
  );

  const handleToggleLike = () => {
    if (isLiked === undefined) return;
    const toggleParams: toggleLikeGoodsParamsType = {
      goods_id,
      user_id,
      isLiked,
    };
    likeMutate(toggleParams);
  };

  if (isError) return <div>에러</div>;
  if (isPending) return <div>로딩 중..</div>;

  return (
    <>
      <span
        className={`cursor-pointer text-3xl ${
          isLiked ? 'text-primary-400' : 'text-black-50'
        }`}
        onClick={handleToggleLike}
      >
        {isLiked ? <IoHeart /> : <IoHeartOutline />}
      </span>
    </>
  );
}

export default Hearts;
