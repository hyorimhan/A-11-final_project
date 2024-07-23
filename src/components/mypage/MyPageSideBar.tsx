import Link from 'next/link';
import { IoMdHeart } from 'react-icons/io';

const MyPageSideBar = () => {
  return (
    <div>
      <div className='mb-10'>
        <p>아이디</p>
        <p className='flex flex-row items-center'>
          작성글 수 5 |<IoMdHeart className='ml-1' /> 35
        </p>
      </div>
      <div className='gap-2 flex flex-col'>
        <Link href={'/travel_tracking'}>여행상품 주문/배송조회</Link>
        <Link href={'/'}>굿즈샵 주문/배송조회</Link>
        <Link href={'/'}>회원정보수정</Link>
        <Link href={'/address'}>배송지 관리</Link>
        <Link href={'/post_list'}>커뮤니티 작성 글 목록</Link>
        <Link href={'/'}>문의하기</Link>
        <Link href={'/'}>회원탈퇴</Link>
      </div>
    </div>
  );
};

export default MyPageSideBar;
