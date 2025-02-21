import React, { useEffect, useState } from 'react';
import './Nav.css';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate('/search?q=' + e.target.value);
  };
  return (
    <nav className={`nav ${show && 'nav__black'}`}>
      <img
        alt='Netflix logo'
        className='nav__logo'
        onClick={() => (window.location.href = '/')}
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png'
      />
      <div className='nav__search'>
        <input
          value={searchValue}
          onChange={handleChange}
          className='nav__input'
          placeholder='영화를 검색해주세요'
        ></input>
        <IoIosSearch className='w-[30px] h-[30px]' />
      </div>

      <img
        alt='User logged'
        className='nav__avatar'
        src='https://i.pinimg.com/736x/61/54/76/61547625e01d8daf941aae3ffb37f653.jpg'
      />
    </nav>
  );
}
