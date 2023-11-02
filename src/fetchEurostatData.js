// fetchEurostatData.js
import axios from "axios";

const eurostatApiEndpoint = "https://api.eurostat.ec.europa.eu/rest/data/v2.1/json/en";

async function fetchEurostatData() {
  const response = await axios.get(eurostatApiEndpoint, {
    params: {
      q: "climate",
      p: "/sdmx-json/data/esl/sieaei/en0811",
    },
  });

  if (response.status === 200) {
    const data = response.data.dataSets[0];
    console.log(JSON.stringify(data));
  } else {
    console.error("Error fetching Eurostat data");
  }
}

// App.js
import React, { useEffect } from "react";
import fetchEurostatData from "./fetchEurostatData";

function App() {
  useEffect(() => {
    fetchEurostatData();
  }, []);

  return (
    <div className="container">
      <h1>Jiku-Test Vercel App</h1>
    </div>
  );
}

export default App;
