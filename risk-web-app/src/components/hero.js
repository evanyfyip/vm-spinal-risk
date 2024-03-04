import React from 'react';

function Hero() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '50px 20px',
      backgroundSize: 'cover',
      color: 'white',
    }}>
      <h1>Aligning Personalized Care with Machine Learning</h1>
      <p>Discover how our ML model is helping surgeons and patients better understand each other.  </p>
      <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#00ade6', color: 'white', border: 'none', borderRadius: '5px' }}>
        Learn More
      </button>
    </div>
  );
}

export default Hero;