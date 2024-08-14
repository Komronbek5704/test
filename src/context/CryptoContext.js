// src/context/CryptoContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [current, setCurrent] = useState("$");
  const [singleCrypto, setSingleCrypto] = useState({});
  const [openWatchList, setOpenWatchList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h'
      );
      setData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const convertCurrency = (amount, rate) => (amount * rate).toFixed(2);

  const handleCurrencyChange = (e) => setCurrent(e.target.value);

  const handleOpenWatchList = () => setOpenWatchList(!openWatchList);

  const addToWatchList = (crypto) => setWatchList([...watchList, crypto]);

  const removeFromWatchList = (id) => setWatchList(watchList.filter(item => item.id !== id));

  const getPriceTrunk = (price) => parseFloat(price).toFixed(2);

  const NumberToMillions = (number, rate) => (number * rate / 1e6).toFixed(2);

  const convertMarketCup = (marketCap, rate) => marketCap * rate;

  const handleSearch = (term) => setSearchTerm(term);

  const getCryptoById = async (id) => {
    try {
      const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
      setSingleCrypto(result.data);
    } catch (error) {
      console.error('Error fetching single crypto data:', error);
    }
  };

  return (
    <CryptoContext.Provider
      value={{
        data,
        fetchData,
        current,
        convertCurrency,
        handleCurrencyChange,
        handleOpenWatchList,
        openWatchList,
        addToWatchList,
        removeFromWatchList,
        watchList,
        getPriceTrunk,
        NumberToMillions,
        convertMarketCup,
        handleSearch,
        searchTerm,
        getCryptoById,
        singleCrypto,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};