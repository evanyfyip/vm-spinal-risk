import React from 'react';
import { FaReact } from 'react-icons/fa'; 

function ReactFooter() {
  return (
    <footer style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#282c34',
      color: 'white',
    }}>
      <p style={{ margin: '0 10px' }}>Powered by</p>
      <FaReact size={50} color="#61DAFB" /> 
    </footer>
  );
}

export default ReactFooter;