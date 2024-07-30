import TourHearts from '@/components/tour/tourDetail/TourHearts';
import { useGetLikedToursByUser } from '@/hooks/toursHooks';
import Image from 'next/image';

interface LikedPlanetParamsType {
  user_id: string;
}

function LikedPlanet({ user_id }: LikedPlanetParamsType) {
  const {
    data: likedTours,
    isError,
    isPending,
  } = useGetLikedToursByUser(user_id);

  if (isError) return <div>에러</div>;
  if (isPending) return <div>로딩 중..</div>;

  return (
    <>
      <ul className='text-black-50 mb-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {likedTours.map((item) => (
          <li key={item.id} className='mx-auto my-4 w-full bg-black-1000'>
            <div className='relative'>
              <Image
                src={item.planets.planet_img}
                alt={item.planet_id}
                width={268}
                height={272}
                className='rounded-lg w-full h-72 object-cover'
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className='p-2'>
              <p className='flex justify-start text-base'>
                {item.planets.name}
              </p>
              <div className='flex flex-row'>
                <p className='flex justify-center text-xl'>{`${item.price.toLocaleString()}원`}</p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                {user_id && <TourHearts tour_id={item.id} user_id={user_id} />}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default LikedPlanet;
