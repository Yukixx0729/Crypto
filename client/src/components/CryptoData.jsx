import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CryptoData = () => {
  const { cryptoname } = useParams();
  const location = useLocation();
  const [cryptoData, setCryptoData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCryptoname = async () => {
      const date = location.state?.date;
      if (date) {
        const res = await fetch(
          `http://localhost:3000/api/crypto/name/${cryptoname}?date=${date}`
        );
        const data = await res.json();
        setCryptoData(data);
      }
    };
    fetchCryptoname();
  }, []);
  return (
    <>
      {cryptoData && (
        <div className="crypto-container">
          <h2>Crypto: {cryptoData.name}</h2>
          <p>Date: {cryptoData.date.slice(0, 10)}</p>
          <div className="sub-container">
            <p>Price(close): ${cryptoData.close.toFixed(2)}</p>
            <p>Price(open): ${cryptoData.open.toFixed(2)}</p>
            <p>Price(high): ${cryptoData.high.toFixed(2)}</p>
            <p>Price(low): ${cryptoData.low.toFixed(2)}</p>
          </div>
          <div className="sub-container">
            {cryptoData.onedayChange && (
              <p>1 day: {(cryptoData.onedayChange * 100).toFixed(2)}%</p>
            )}
            {cryptoData.sevendaysChange && (
              <p>7 days: {(cryptoData.sevendaysChange * 100).toFixed(2)}%</p>
            )}
            {cryptoData.onemonthChange && (
              <p>1 month: {(cryptoData.onemonthChange * 100).toFixed(2)}%</p>
            )}
          </div>
          <div className="sub-container">
            <p>24 volume: ${cryptoData.volume}</p>
            <p>market cap: ${cryptoData.marketCap}</p>
          </div>

          <button
            onClick={() => {
              navigate("/", {
                state: { date: cryptoData.date.slice(0, 10) },
              });
            }}
          >
            Back to home page
          </button>
        </div>
      )}
    </>
  );
};

export default CryptoData;
