import React, { useEffect, useState } from 'react';
import JSONstat from 'jsonstat-toolkit';
import { cityData } from './cityData.js';

const datasetCode = 'env_wasgen';
const lang = 'EN';
const baseUrl = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/';

function CityDataComponent({ onEurostatDataFetched, checkboxStates }) {
  useEffect(() => {
    const fetchData = async () => {
      const url = buildEurostatApiUrl();

      try {
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        const dataset = JSONstat(jsonData);

        if (dataset.length === 0) {
          throw new Error('The dataset is empty.');
        }

        const formattedData = processData(dataset);

        onEurostatDataFetched(formattedData);
      } catch (error) {
        console.error('Error fetching Eurostat data:', error);
      }
    };

    fetchData();
  }, []);

  const extractAvailableYears = (dataset) => {
    const timeDimension = dataset.Dimension('time');
    if (timeDimension) {
      return timeDimension.Category().map(category => category.label);
    }
    return [];
  };

  const buildEurostatApiUrl = () => {
    return `${baseUrl}${datasetCode}?format=json&lang=${lang}`;
  };

  const processData = (dataset) => {
    const data = dataset.toTable({ type: 'arrobj' });
    const formattedData = {};

    data.forEach((row) => {
      const { geo, time, waste, value, unit, freq, ...rest } = row;
      const cityInfo = cityData.find((city) => city.city === geo);

      if (cityInfo) {
        const coordinates = {
          latitude: cityInfo.latitude,
          longitude: cityInfo.longitude
        };

        if (!formattedData[geo]) {
          formattedData[geo] = {
            coordinates,
            dates: {}
          };
        }

        if (!formattedData[geo].dates[time]) {
          formattedData[geo].dates[time] = {};
        }

        // Check if value is null and handle accordingly
        let formattedValue;
        if (value === null) {
          formattedValue = "No data available";
        } else {
          formattedValue = value.toLocaleString('de-DE'); // Use 'de-DE' for German locale
        }

        // Check for null values in the rest of the properties and replace them
        const sanitizedRest = Object.fromEntries(
          Object.entries(rest).map(([key, val]) => [key, val === null ? "No data available" : val])
        );

        formattedData[geo].dates[time][waste] = { value: formattedValue, unit, freq, ...sanitizedRest };

        // Dynamically set checkbox state based on data keys
        Object.keys(sanitizedRest).forEach((key) => {
          // Check if the key is not in the checkboxStates object
          if (!checkboxStates.hasOwnProperty(key)) {
            // Set the key with a default value, e.g., true or false
            checkboxStates[key] = true; // Set your default value here
          }
        });
      }
    });

    return formattedData;
  };

  return null;
}

export default CityDataComponent;
