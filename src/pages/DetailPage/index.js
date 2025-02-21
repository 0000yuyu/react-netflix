import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(`/movie/${movieId}`);
        if (
          request.data.backdrop_path == null &&
          request.data.poster_path == null
        ) {
          throw new Error('error');
        }
        setMovie(request.data);
      } catch (error) {}
    }
    fetchData();
  }, [movieId]);
  if (movie == null)
    return (
      <div
        className='w-full h-full text-white 
        my-[50px] flex justify-center'
      >
        <h2
          className='my-[100px] w-[200px] h-[300px]
         text-2xl text-center'
        >
          loading...
        </h2>
      </div>
    );
  return (
    <section>
      <img
        className='modal__poster'
        src={`https://image.tmdb.org/t/p/original/${
          movie.backdrop_path || movie.poster_path
        }`}
        alt='poster'
      />
    </section>
  );
}
