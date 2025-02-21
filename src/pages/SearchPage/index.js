import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './SearchPage.css';
import { AiOutlineLike } from 'react-icons/ai';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const navigate = useNavigate();

  let query = useQuery();
  const searchTerm = query.get('q');
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    console.log('searchTerm', searchTerm);
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map((movie) => {
          const movieImageUrl =
            movie.backdrop_path || movie.poster_path
              ? `https://image.tmdb.org/t/p/original${
                  movie.backdrop_path || movie.poster_path
                }`
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/500px-Netflix_2015_logo.svg.png';
          return (
            <div className='movie' key={movie.id}>
              <div
                onClick={() => {
                  navigate(`/${movie.id}`);
                }}
                className='movie__column-poster'
              >
                <div className='movie__overlay'>
                  <span className='movie__title'>
                    {movie.title || movie.name}
                  </span>
                  <span className='movie__like'>
                    <AiOutlineLike className='movie__like' />
                    <h1>{movie.vote_average}</h1>
                  </span>
                </div>

                <img
                  src={movieImageUrl}
                  alt='movie'
                  className='movie__poster'
                />
              </div>
            </div>
          );
        })}
      </section>
    ) : (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>찾고자하는 검색어"{debounceSearchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
