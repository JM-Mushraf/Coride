import React from 'react';
import './HomeSlider.css';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const HomeSlider = () => {
  const [text] = useTypewriter({
    words: ['Cheaper...', 'Greener...', 'Safer...'],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="home-slider">
      <div className="homeslider-container">
        <h1 className="text">
          Travelling Made <span style={{ fontWeight: 'bold', color: 'rgb(37, 178, 233)' }}>{text}</span>
          <span style={{ color: 'gray' }}><Cursor /></span>
        </h1>
      </div>
    </div>
  );
};

export default HomeSlider;
