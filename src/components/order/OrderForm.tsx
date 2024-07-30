'use client';

import ExpressInfo from './ExpressInfo';
import PayButton from './PayButton';
import ItemsInfo from './ItemsInfo';
import CustomerInfo from './CustomerInfo';

interface OrderFormPropsType {
  isTour: boolean;
}

function OrderForm({ isTour }: OrderFormPropsType) {
  return (
    <>
      <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,0.5fr)] gap-x-10'>
        <div className='flex flex-col items-start'>
          {!isTour && (
            <div className='mt-4 w-full'>
              <ExpressInfo />
            </div>
          )}
          <div className='mt-4 w-full'>
            <CustomerInfo />
          </div>
          <div className='mt-4 w-full'>
            <ItemsInfo label='상품정보' />
          </div>
        </div>
        <div>
          <PayButton />
        </div>
      </div>
    </>
  );
}

export default OrderForm;