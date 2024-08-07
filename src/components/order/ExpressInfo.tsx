'use client';

import { useEffect, useState } from 'react';
import AddressChangeModal from './AddressChangeModal';
import { Address } from '@/types/userAddressType';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';
import AddressInfo from './AddressInfo';

interface ExpressInfoPropsType {
  addressList: Address[];
}

function ExpressInfo({ addressList }: ExpressInfoPropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expressAddress, setExpressAddress } = useExpressInfoStore(
    (state) => state,
  );
  const defaultAddress = addressList.find((address) => address.is_default);

  useEffect(() => {
    setExpressAddress(defaultAddress ?? null);
  }, []);

  return (
    <>
      <div className='border-2 border-black-300 rounded-lg p-4 mb-8'>
        <div className='py-4 mb-4 border-b-2 border-black-700 flex flex-row items-center justify-between'>
          <span className='text-xl text-black-50'>배송정보</span>
          <button
            className='bg-primary-400 rounded-lg p-2 transition-colors duration-200 hover:bg-primary-200 active:bg-primary-300'
            onClick={() => setIsModalOpen(true)}
          >
            배송지 변경
          </button>
        </div>
        {expressAddress || defaultAddress ? (
          <AddressInfo
            expressAddress={expressAddress}
            defaultAddress={defaultAddress!}
          />
        ) : (
          <div>배송지를 설정해주세요</div>
        )}
      </div>
      {isModalOpen && (
        <AddressChangeModal
          addressList={addressList}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}

export default ExpressInfo;
