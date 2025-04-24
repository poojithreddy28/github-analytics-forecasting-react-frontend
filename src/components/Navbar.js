// src/components/Navbar.js
import React from 'react';
import './Navbar.css';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <AiOutlineFundProjectionScreen size={24} />
        <span>GitHub Analytics Forecasting</span>
      </div>
    </nav>
  );
}