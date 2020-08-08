import React from 'react';
import { Link } from './myReactRouter/react-router-dom/Link';

function Login(props) {
  return (
    <>
      <h1>登录页</h1>
      <Link to="/">回首页</Link>
    </>
  );
}

export default Login;