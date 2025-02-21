import React from 'react';
import Row from '../../components/Row';
import requests from '../../api/request';
import Banner from '../../components/Banner';

export default function MainPage() {
  return (
    <div>
      <Banner />
      <Row
        title='NETFLIX ORIGINALS'
        isLargeRow
        id='NO'
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} />
      <Row title='Top rated' id='TR' fetchUrl={requests.fetchTopRated} />
      <Row
        title='Action movies'
        id='AM'
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title='Commed movies'
        id='CM'
        fetchUrl={requests.fetchCommedMovies}
      />
      <Row
        title='Horror movies'
        id='HM'
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        title='Romance movies'
        id='RM'
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        title='Documentaries'
        id='DM'
        fetchUrl={requests.fetchDocumentaris}
      />
    </div>
  );
}
