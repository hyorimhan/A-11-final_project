'use client';

import { useState } from 'react';
import CheckBox from '@/components/mypage/delete_account/CheckBox';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/services/auth';
import useAuthStore from '@/zustand/store/useAuth';

type DeleteAccountBtnProps = {
  buttonText: string;
};

const DeleteAccountBtn = ({ buttonText }: DeleteAccountBtnProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleDeleteAccount = async () => {
    if (user) {
      const responseData = await deleteUser(user.id);

      if (responseData.error) {
        console.error('회원탈퇴오류:', responseData.error);
        alert('회원탈퇴오류발생');
      } else {
        alert('회원탈퇴완료');
        router.replace('/');
      }
    }
  };

  return (
    <div>
      <div className='flex gap-2 py-9 items-center'>
        <CheckBox onChange={setIsChecked} />
        <p className='text-sm'>
          회원탈퇴 유의사항을 모두 확인하였으며, VOYAGE X 회원탈퇴에 동의합니다.
        </p>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={handleDeleteAccount}
          className={`w-80 rounded-lg p-3 text-black-50 ${
            isChecked
              ? 'bg-primary-600 hover:bg-primary-400 active:bg-primary-500'
              : 'bg-black-400 text-black-200 cursor-not-allowed'
          }`}
          disabled={!isChecked}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountBtn;