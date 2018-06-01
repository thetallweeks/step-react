import React from 'react';
import logo from '../../logo.svg';
import './Header.css';

const Header = () => {
  return (
    <header className="Header">
      <img src={logo} className="Header-logo" alt="logo" />
    </header>
  )
};

export default Header;
