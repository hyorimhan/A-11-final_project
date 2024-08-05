'use client';

import { useEffect, useState } from 'react';
import DropDownButton from './DropDownButton';
import Hearts from './Hearts';
import Stars from './Stars';
import Image from 'next/image';
import { useGetOrderedGoods } from '@/hooks/goodsHooks';
import useAuthStore from '@/zustand/store/useAuth';
import { useRouter } from 'next/navigation';
import Loading from '../common/Loading';

function GoodsList() {
  const user = useAuthStore((state) => state.user);
  console.log(user?.id);
  const categories = {
    'like_count': '인기순',
    'created_at': '최신순',
    'goods_price': '가격 높은 순',
    '-goods_price': '가격 낮은 순',
    'rating_avg': '별점 높은 순',
    '-rating_avg': '별점 낮은 순',
  };
  const [sortBy, setSortBy] = useState('like_count');
  const { data: goods, isError, isPending } = useGetOrderedGoods(sortBy);

  const router = useRouter();

  const handleItemClick = (id: string) => {
    router.push(`/shop_detail/${id}`);
  };

  console.log(goods);

  if (isError) return <div>에러</div>;
  if (isPending) return <Loading />;

  return (
    <>
      <div className='flex justify-end mt-14'>
        <DropDownButton
          categories={categories}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <ul className='text-black-50 mb-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {goods?.map((item) => (
          <li key={item.id} className='mx-auto my-4 w-full bg-black-1000'>
            <div className='relative'>
              <Image
                src={item.goods_img}
                alt={item.description}
                width={268}
                height={272}
                className='rounded-lg w-full h-72 object-cover cursor-pointer'
                style={{ objectFit: 'cover' }}
                onClick={() => handleItemClick(item.id)}
              />
            </div>
            <div className='p-2'>
              <p
                className='flex justify-start text-base cursor-pointer'
                onClick={() => handleItemClick(item.id)}
              >
                {item.goods_name}
              </p>
              <div className='flex flex-row'>
                <p className='text-red-600 text-xl mr-2'>10%</p>
                <p className='flex justify-center text-xl'>{`${item.goods_price.toLocaleString()}원`}</p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-2'>
                  <Stars ratingAvg={item.rating_avg} />
                  <div className='bg-black-600 rounded-xl text-xs p-1.5'>
                    무료배송
                  </div>
                </div>
                <Hearts goods_id={item.id} user_id={user?.id} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default GoodsList;
