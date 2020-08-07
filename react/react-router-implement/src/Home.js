import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/login">去登录</Link>
    </>
  );
}

export default Home;