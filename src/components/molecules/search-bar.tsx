'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';

import { Input, InputProps } from '../ui/input';

interface Props extends InputProps {
  query: string;
  handleChangeQuery: (query: string) => void;
}

const SearchBar = ({ query, handleChangeQuery, ...other }: Props) => {
  const [tempValue, setTempValue] = useState('');

  const debouncedRequest = useDebounce(() => {
    handleChangeQuery(tempValue);
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTempValue(event.target.value);

    debouncedRequest();
  };

  useEffect(() => {
    setTempValue(query);
  }, []);

  return <Input placeholder="Search" {...other} value={tempValue} onChange={handleChange} className="max-w-md" />;
};

export default SearchBar;
