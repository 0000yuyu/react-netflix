import React, { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay); //딜레이 이후에 반영

    return () => {
      clearTimeout(handler);
      console.log('clear');
    };
  }, [value, delay]); //다시 value가 바뀐다면 clear 함수 실행

  return debounceValue;
};
