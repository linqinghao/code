import React from 'react';
import { Link } from './myReactRouter/react-router-dom/Link';

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/login">去登录</Link>
    </>
  );
}

export default Home;