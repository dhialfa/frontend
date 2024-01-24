import React from 'react';
import './stylesheets/Logo.css';
import image from '../images/Logo.png';

const Logo = ({ pixel }) => {
  const altText = 'Logo empresa'; 
  const styles = {
    width: pixel,
  };
  return (
    <div className="logo-container">
      <img src={image} alt={altText} style={styles}/>
    </div>
  );
};

export default Logo;
