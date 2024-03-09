import React from 'react';
import { FaReact } from 'react-icons/fa'; 

function ReactFooter() {
  return (
    <footer style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: 'white',
      color: 'black',
    }}>
      <p style={{ margin: '0 10px', color: 'black' }}>Built With:</p>
      <FaReact size={25} color="#61DAFB" /> 
      <img src={'/muilogo.png'} alt="Logo" style={{ height: '25px', marginLeft: '10px' }} />
      <img src={'/flasklogo.png'} alt="Logo" style={{ height: '25px', marginLeft: '10px', borderRadius:5}} />
    </footer>
  );
}

export default ReactFooter;