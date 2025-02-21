import { useEffect, useState, useRef } from 'react';

export function Test() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounceNoCleanup(value, 1000); // 클린업 없는 버전 사용

  return (
    <div className='text-white m-[50px] text-2xl'>
      <h2>⚠️ Without Cleanup</h2>
      <input
        className='text-black'
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>Debounced Value: {debouncedValue}</div>
    </div>
  );
}

function useDebounceNoCleanup(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const renderCount = useRef(0);
  const timeoutStart = useRef(null); // 타이머 시작 시간 기록

  useEffect(() => {
    renderCount.current += 1;
    timeoutStart.current = Date.now();

    console.log(
      `🟢 [No Cleanup] useEffect 실행됨 - renderCount: ${renderCount.current}`
    );
    console.log(
      `⏰ [No Cleanup] setTimeout 설정 - value: ${value}, delay: ${delay}ms`
    );

    setTimeout(() => {
      const elapsed = Date.now() - timeoutStart.current;
      console.log(`✅ [No Cleanup] Debounced Value 설정됨: ${value}`);
      console.log(`⌛ 경과 시간: ${elapsed}ms`);
      setDebouncedValue(value);
    }, delay);

    // ❌ 클린업 함수 없음
  }, [value, delay]);

  return debouncedValue;
}
