import React, { useState, useEffect } from "react";
import axios from "axios";

const EurostatClimateData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Ottieni l'elenco di tutte le API disponibili
    axios
      .get("https://ec.europa.eu/eurostat/api/v2/eurostat/climate/data/json")
      .then((response) => {
        // Handle successful response
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Request failed with status:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Error setting up the request:", error.message);
        }
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {data.map((entry) => (
        <div key={entry.id}>
          <h2>{entry.id}</h2>
          <table>
            <thead>
              <tr>
                <th>Nazione</th>
                <th>Data</th>
                <th>Dato</th>
              </tr>
            </thead>
            <tbody>
              {entry.data.map((row) => (
                <tr key={row.id}>
                  <td>{row.dimensions[0].values[0]}</td>
                  <td>{row.dimensions[1].values[0]}</td>
                  <td>{row.values[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default EurostatClimateData;