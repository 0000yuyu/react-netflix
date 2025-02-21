import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import MovieDetail from './pages/MovieDetail';
import Header from './components/Header';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/:movieId' element={<MovieDetail />} />
        </Route>
      </Routes>
    </div>
  );
}
function Layout() {
  return (
    <div className='bg-blue-200'>
      <Header />
      <div className='pt-[50px]'>
        <Outlet />
      </div>
    </div>
  );
}
