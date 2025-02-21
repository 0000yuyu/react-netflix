import React, { useEffect, useState } from 'react';
import requests from '../api/request';
import axios from '../api/axios';
import './Banner.css';

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };
  const fetchData = async () => {
    const request = await axios.get(requests.fetchNowPlaying);
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ]?.id;
    const { data: movieDetails } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });
    setMovie(movieDetails);
  };
  if (!isClicked) {
    return (
      <header
        className='banner'
        style={{
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className='banner__buttons'>
            <button
              className='banner__button play'
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className='banner__button info'>
              <div className='space'>More Information</div>
            </button>
          </div>
          <h1 className='banner__description'>{movie.overview}</h1>
        </div>
        <div className='banner__fadeBottom'></div>
      </header>
    );
  }
  return (
    <div
      className='flex flex-col justify-center 
    w-full h-[100vh] items-center'
    >
      <div className='w-full h-full'>
        <iframe
          width='640'
          height='360'
          className='w-full h-full
          z-[-1] opacity-[0.65] border-none 
          after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full'
          src={`https://www.youtube.com/embed/${movie.videos?.results[0]?.key}?playlist=${movie.videos?.results[0]?.key}`}
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerpolicy='strict-origin-when-cross-origin'
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
