import axios from '../api/axios';
import React, { useEffect, useRef, useState } from 'react';
import requests from '../api/request';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Row({ fetchUrl, title, IsLargeRow }) {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null);
  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(fetchUrl);
      const movies = response.data?.results;
      console.log(movies);
      setMovies(movies || []);
    }
    fetchMovies();
  }, [fetchUrl]);
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300; // 원하는 스크롤 양 (px)
      const newScrollPosition =
        direction === 'left'
          ? sliderRef.current.scrollLeft - scrollAmount
          : sliderRef.current.scrollLeft + scrollAmount;
      sliderRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth', // 부드러운 스크롤 효과 적용
      });
    }
  };
  return (
    <div className='flex flex-col gap-3 text-white pt-[30px] pl-[30px]'>
      <h2
        className={`z-[100] ${
          IsLargeRow ? 'font-bold text-[36px]' : 'font-semibold text-[24px]'
        }`}
      >
        {title}
      </h2>
      <div
        className={`group relative flex overflow-hidden items-center ${
          IsLargeRow ? 'h-[400px]' : 'h-[200px]'
        }`}
      >
        <div
          onClick={() => scroll('left')}
          className='z-[10] hidden h-full w-[50px] absolute cursor-pointer
         items-center justify-center text-2xl group-hover:flex 
         hover:bg-black hover:bg-opacity-50 hover:scale-125 transition-all'
        >
          <IoIosArrowBack />
        </div>
        <div ref={sliderRef} className='flex gap-3'>
          {movies.map((movie) => (
            <img
              className={
                (IsLargeRow ? `w-[300px] h-[320px]` : 'w-[400px] h-[150px]') +
                ' flex object-cover rounded hover:scale-125 transition duration-700'
              }
              src={
                requests.fetchImg +
                (IsLargeRow ? movie.poster_path : movie.backdrop_path)
              }
              alt='movie poster'
            ></img>
          ))}
        </div>
        <div
          onClick={() => scroll('right')}
          className='flex h-full w-[50px] right-0 absolute cursor-pointer
         items-center justify-center text-2xl group hover:flex 
         hover:bg-black hover:bg-opacity-50 hover:text-3xl hover:w-[55px]'
        >
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
}
