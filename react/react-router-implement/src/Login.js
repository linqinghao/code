import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <h1>登录页</h1>
      <Link to="/">回首页</Link>
    </>
  );
}

export default Login;