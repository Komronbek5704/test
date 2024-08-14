// src/components/Carusel.jsx
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

// Karusel konfiguratsiyasi
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Carusel = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h');
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
      {cryptoData.map((crypto) => (
        <div key={crypto.id} style={{ padding: '10px' }}>
          <img src={crypto.image} alt={crypto.name} style={{ width: '100%', height: 'auto' }} />
          <h3>{crypto.name}</h3>
          <p>${crypto.current_price.toFixed(2)}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default Carusel;