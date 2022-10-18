import React from "react";
import useMockData from "../utils/mockData";
const Main = () => {
  const { error, initialize, progress, status } = useMockData();
  const handleClick = () => {
    console.log("handleClick");
    initialize();
  };

  return (
    <div className="container mt-5">
      <h1>Main</h1>
      <h1>Инициализация данных в FireBase</h1>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}</li>
        {error && <li>error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        Инициализировать
      </button>
    </div>
  );
};
export default Main;
