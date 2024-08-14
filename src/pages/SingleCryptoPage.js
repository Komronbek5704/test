import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
import ApexChart from "../components/ApexChart";
import "../styles/cryptoPage.css";

function SingleCryptoPage() {
  const { id } = useParams(); // URL-dan kripto ID-ni olish
  const { getCryptoById, singleCrypto, current, convertCurrency } = useContext(CryptoContext);

  useEffect(() => {
    getCryptoById(id); // Komponent o'rnatilganida kripto ma'lumotlarini olish
  }, [id, getCryptoById]);

  if (!singleCrypto || !singleCrypto.market_data) {
    return <div>Loading...</div>; // Ma'lumotlar yuklanayotganda ko'rsatiladigan matn
  }

  const { name, image, market_data } = singleCrypto;
  const { current_price, price_change_percentage_24h, market_cap } = market_data;

  return (
    <div className="single-crypto-page">
      <h1>{name}</h1>
      <img src={image?.large} alt={name} className="crypto-image" />
      <div className="crypto-info">
        <p>
          <strong>Current Price:</strong> {current} {convertCurrency(current_price, current === "$" ? 1 : 0.012)}
        </p>
        <p>
          <strong>24h Change:</strong> {price_change_percentage_24h.toFixed(2)}%
        </p>
        <p>
          <strong>Market Cap:</strong> {current} {convertCurrency(market_cap, current === "$" ? 1 : 0.012)}
        </p>
      </div>
      {/* ApexChart ga ma'lumotlarni o'tkazish */}
      <ApexChart data={singleCrypto.market_data?.price_change_percentage_24h_in_currency} />
    </div>
  );
}

export default SingleCryptoPage;