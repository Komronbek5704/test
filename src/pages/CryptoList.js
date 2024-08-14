// src/pages/CryptoList.jsx
import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import '../styles/cryptoPage.css';

function CryptoList() {
  const { data, addToWatchList, current, convertCurrency } = useContext(CryptoContext);

  const formatPrice = (price) => {
    switch (current) {
      case 'â¹': // Tenge
        return ${current} ${convertCurrency(price, 1)};
      case '$': // USD
        return ${current} ${convertCurrency(price, 0.012)};
      case '€': // Euro
        return ${current} ${convertCurrency(price, 0.0111)};
      default:
        return ${current} ${price};
    }
  };

  return (
    <div>
      <h1>Crypto List</h1>
      <div className="crypto-list">
        {data.map((crypto) => (
          <div key={crypto.id}>
            <h2>{crypto.name}</h2>
            <p>{formatPrice(crypto.current_price)}</p>
            <button onClick={() => addToWatchList(crypto)}>Add to Watchlist</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CryptoList;