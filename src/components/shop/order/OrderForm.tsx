'use client';

import { useEffect, useState } from 'react';
import ExpressInfo from './ExpressInfo';
import PayButton from './PayButton';
import ItemsInfo from './ItemsInfo';
import CustomerInfo from './CustomerInfo';

// export type Address = {
//   alias: string | null;
//   postcode: string | null;
//   address: string | null;
//   oldAddress: string | null;
//   detailAddress: string | null;
//   recipient: string | null;
//   phone: string | null;
//   is_default: boolean | null;
// };

// export type Customer = {
//   customerName: string;
//   customerPhone: string;
//   customerEmail: string;
// };

// export type Item = {
//   id: string;
//   name: string;
//   createdAt: string;
//   price: number;
//   description: string;
//   img: string;
//   quantity: number;
// };

// export type ItemList = Item[];

function OrderForm() {
  const user_email = 'gusdnr0839@gmail.com';
  const itemList: ItemList = [
    {
      id: '1',
      name: '검은 티셔츠',
      createdAt: '2024-07-23',
      price: 30000,
      description: '검은 티셔츠 L',
      img: 'data:image/jpeg;base64,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',
      quantity: 3,
    },
    {
      id: '2',
      name: '청바지',
      price: 50000,
      createdAt: '2024-07-22',
      description: '청바지 L',
      img: 'data:image/jpeg;base64,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',
      quantity: 2,
    },
  ];
  const [expressInfo, setExpressInfo] = useState<Address>({
    alias: '집',
    postcode: '52453',
    address: '경남 남해군 창선면 창선로94번길 11-2 (상죽리)',
    oldAddress: '경남 남해군 창선면 상죽리 80',
    detailAddress: '초록색대문',
    recipient: 'gusdnr',
    phone: '010-1234-1234',
  });
  const [customerInfo, setCustomerInfo] = useState<Customer>({
    customerName: expressInfo.recipient,
    customerPhone: expressInfo.phone,
    customerEmail: 'gusdnr0839@gmail.com',
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCustomerInfo((prev) => ({
      ...prev,
      customerName: expressInfo.recipient,
      customerPhone: expressInfo.phone,
      customerEmail: user_email,
    }));
  }, [expressInfo]);

  return (
    <>
      <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,0.3fr)] gap-x-10'>
        <div className='flex flex-col items-start'>
          <div className='mt-4 w-full'>
            <ExpressInfo
              expressInfo={expressInfo}
              setExpressInfo={setExpressInfo}
            />
          </div>
          <div className='mt-4 w-full'>
            <CustomerInfo
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
            />
          </div>
          <div className='mt-4 w-full'>
            <ItemsInfo itemList={itemList} setTotalPrice={setTotalPrice} />
          </div>
        </div>
        <div>
          <PayButton
            expressInfo={expressInfo}
            customerInfo={customerInfo}
            itemList={itemList}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </>
  );
}

export default OrderForm;
