import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from '../api/request';

export default function Banner() {
  const [bannerMovie, setBannerMovie] = useState([]);
  //사진을 불러와야 됨!
  useEffect(() => {
    //영화들 가져오기
    async function getBannerMovie() {
      const response = await axios.get(requests.fetchNowPlaying);
      const movies = await response.data?.results;
      //랜덤한 값 선택하기
      const selectedMovie = movies[Math.floor(Math.random() * movies.length)];
      setBannerMovie(selectedMovie);
      console.log(selectedMovie);
    }
    getBannerMovie();
  }, []); //리 렌더링이 될때마다 실행

  return (
    <div
      className='
    relative flex h-[600px]'
    >
      <img
        src={requests.fetchImg + bannerMovie.backdrop_path}
        alt='movie img'
        className='bg-liner-to-r from-black to black'
      />
      <div
        className='absolute text-white 
        top-[150px] p-[20px] max-w-[400px] 
      flex flex-col gap-2'
      >
        <h2 className='text-[48px] font-bold overflow-ellipsis whitespace-nowrap'>
          {bannerMovie.title}
        </h2>
        <div className='flex gap-2'>
          <button
            className='bg-white text-black font-bold text-[18px]
            w-[100px] text-left px-[20px] h-[40px] py-[3px] 
            rounded-sm hover:opacity-[0.5]'
          >
            Play
          </button>
          <button
            className='bg-zinc-500 opacity-[0.9] font-bold text-[16px]
          px-[16px] py-[3px] rounded-sm hover:bg-zinc-600'
          >
            More Information
          </button>
        </div>

        <div className='mt-3 max-h-[150px] line-clamp-4'>
          {bannerMovie.overview}
        </div>
      </div>
    </div>
  );
}
