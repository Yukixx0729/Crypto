import { useEffect, useState } from "react";
import DateData from "./DateData";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const DateForm = () => {
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [cryptoData, setCryptoData] = useState(null);
  const handleOnChange = (e) => {
    setDate(e.target.value);
    localStorage.setItem("selectedDate", e.target.value);
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    setCryptoData(null);
    setError(false);
    if (date.length) {
      const res = await fetch(`${API_URL}/crypto/date/${date}`);
      const data = await res.json();
      setCryptoData(data);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const handleBackHome = async () => {
      const storedDate = localStorage.getItem("selectedDate");

      setDate(storedDate);
      if (storedDate) {
        // console.log(date, dateStore);
        const res = await fetch(`${API_URL}/crypto/date/${storedDate}`);
        const data = await res.json();
        setCryptoData(data);
      }
    };
    handleBackHome();
  }, []);
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
