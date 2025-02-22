import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) setShow(true);
      else setShow(false);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  function handleSearch(event) {
    setSearchValue(event.target.value);
    navigate('search');
  }
  return (
    <div
      className={`z-[1000] fixed px-[40px] p-[30px]
         w-full h-[90px] flex justify-between pr-5 ${
           show && 'bg-black' //Q. 트랜지션 어떻게 천천히 하는지 의문!!
         }`}
    >
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png'
        alt='netflix logo'
        onClick={() => navigate('/')}
      ></img>
      <input
        className='bg-black bg-opacity-55 text-white p-2 rounded'
        type='text'
        placeholder='영화를 검색해주세요'
        value={searchValue}
        onChange={handleSearch}
      />
      <img
        src='https://i.pinimg.com/736x/61/54/76/61547625e01d8daf941aae3ffb37f653.jpg'
        alt='profile img'
      />
    </div>
  );
}
