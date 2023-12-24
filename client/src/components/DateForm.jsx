import { useEffect, useState } from "react";
import DateData from "./DateData";
import { useLocation } from "react-router-dom";
const DateForm = () => {
  const [date, setDate] = useState("");
  const location = useLocation();
  const [error, setError] = useState(false);
  const [cryptoData, setCryptoData] = useState(null);
  const handleOnChange = (e) => {
    setDate(e.target.value);
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    setCryptoData(null);
    setError(false);
    if (date.length) {
      const res = await fetch(`http://localhost:3000/api/crypto/date/${date}`);
      const data = await res.json();
      setCryptoData(data);
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    const handleBackHome = async () => {
      const date = await location.state?.date;
      if (date.length) {
        setDate(date);
        const res = await fetch(
          `http://localhost:3000/api/crypto/date/${date}`
        );
        const data = await res.json();
        setCryptoData(data);
      }
    };
    handleBackHome();
  }, [location.state, setCryptoData]);
  return (
    <>
      <div className="form-container">
        <form>
          <input
            type="date"
            min="2020-10-01"
            max="2021-06-30"
            value={date}
            onChange={handleOnChange}
          />
          <button onClick={handleSumbit}>Confirm</button>
        </form>
        {error ? <div>Please pick a valid date.</div> : <></>}
      </div>
      {cryptoData && <DateData cryptoData={cryptoData} date={date} />}
    </>
  );
};

export default DateForm;
