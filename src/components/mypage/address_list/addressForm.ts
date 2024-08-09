import { phoneValidate } from '@/utils/tourValidation';
import { useState, ChangeEvent } from 'react';

const addressForm = (initialData: any) => {
  const [postcode, setPostcode] = useState<string>(initialData?.postcode || '');
  const [newAddress, setNewAddress] = useState<string>(
    initialData?.address || '',
  );
  const [oldAddress, setOldAddress] = useState<string>(
    initialData?.oldAddress || '',
  );
  const [detailAddress, setDetailAddress] = useState<string>(
    initialData?.detailAddress || '',
  );
  const [alias, setAlias] = useState<string>(initialData?.alias || '');
  const [recipient, setRecipient] = useState<string>(
    initialData?.recipient || '',
  );
  const [phone, setPhone] = useState<string>(initialData?.phone || '');
  const [phoneError, setPhoneError] = useState<string>('');
  const [aliasError, setAliasError] = useState<string>('');
  const [recipientError, setRecipientError] = useState<string>('');

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = phoneValidate(e);
    setPhone(formattedValue);

    if (!/^(\d{3}-\d{4}-\d{4})$/.test(formattedValue)) {
      setPhoneError('숫자만 사용하여 주세요.');
    } else {
      setPhoneError('');
    }
  };

  const handleAliasChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAlias(value);

    if (value.length > 6) {
      setAliasError('6글자 이내로 입력해주세요.');
    } else {
      setAliasError('');
    }
  };

  const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipient(value);

    if (/[^a-zA-Z가-힣\s]/.test(value)) {
      setRecipientError('특수기호나 숫자를 사용할 수 없습니다.');
    } else {
      setRecipientError('');
    }
  };

  return {
    postcode,
    setPostcode,
    newAddress,
    setNewAddress,
    oldAddress,
    setOldAddress,
    detailAddress,
    setDetailAddress,
    alias,
    aliasError,
    handleAliasChange,
    recipient,
    recipientError,
    handleRecipientChange,
    phone,
    phoneError,
    handlePhoneChange,
  };
};

export default addressForm;
