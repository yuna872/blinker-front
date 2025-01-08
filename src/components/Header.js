import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <header>
      <h1>Osan 스마트 음향 신호기 모니터링</h1>
      <button onClick={onLogout}>로그아웃</button>
    </header>
  );
};

export default Header;