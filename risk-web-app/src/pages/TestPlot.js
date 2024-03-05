import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function TestPlot() {
    const [inputValue, setInputValue] = useState(''); 
    const [plotImage, setPlotImage] = useState(''); 

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const drawLineAndFetchPlot = () => {
        axios.post('http://localhost:8000/generate-plot', {
            position: inputValue  
        })
        .then(response => {
            setPlotImage(`data:image/png;base64,${response.data.image}`);
        })
        .catch(error => {
            console.error('Axios error:', error);
        });
    };

    return (
        <div>
            <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter line position"
            />
            <button onClick={drawLineAndFetchPlot}>Draw Line</button>
            {plotImage && <img src={plotImage} alt="Generated Plot" />}
        </div>
    );
}

export default TestPlot;