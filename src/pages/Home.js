import React from 'react';
import Banner from '../components/Banner';
import Row from '../components/Row';
import requests from '../api/request';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Banner />
      <Row
        title={'NETFLIX ORIGINALS'}
        fetchUrl={requests.fetchNetflixOriginals}
        IsLargeRow
      />
      <Row title={'Top Rated'} fetchUrl={requests.fetchTopRated} />
    </div>
  );
}
