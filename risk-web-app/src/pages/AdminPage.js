import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

function AdminPage() {
  const [plotImage, setPlotImage] = useState('');

  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const response = await axios.get('/admin');
        setPlotImage(`data:image/png;base64,${response.data.demo_plot}`);
      } catch (error) {
        console.error('Axios error:', error);
      }
    };
    fetchPlot();
  }, []);

  return (
    <>
      <Fragment>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{plotImage && <img src={plotImage} alt="Training Data Variable Distributions" />}</div>
      </Fragment>
    </>
  );
}

export default AdminPage;