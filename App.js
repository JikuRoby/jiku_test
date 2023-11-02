import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'rc-slider/assets/index.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Slider from 'rc-slider';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedRange, setSelectedRange] = useState([0, 49]);
  const [selectedCircle, setSelectedCircle] = useState({});
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartExplanation, setBarChartExplanation] = useState('');
  const [pieChartExplanation, setPieChartExplanation] = useState('');
  const chatGptApiKey = 'your_api_key_here'; // Replace with your API key
  const chatGptApiEndpoint = 'https://api.openai.com/v1/chat/completions';
  const [inputFieldValue, setInputFieldValue] = useState('');
  const [images, setImages] = useState([]);
  
  async function generateImage() {
    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        prompt: "peole working in un campo pieni di immondizia con bottiglie di plastica e lattine e rifiuti organici",
        n: 1,
        size: '512x512',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatGptApiKey}`,
        },
      });

      if (response.status === 200) {
        setImageUrl(response.data.data[0].url);
        return response.data.data[0].url;
      } else {
        console.error('Image generation request failed with status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  }

  async function generateImageData(circleData) {
    try {
      const prompt = `a vector illustration of a woman vista di lato con una borsa con dentro bottiglie di plastica`;
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        prompt: prompt,
        n: 1,
        size: '512x512',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatGptApiKey}`,
        },
      });

      if (response.status === 200) {
        return response.data.data[0].url;
      } else {
        console.error('Image generation request failed with status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error generating image data:', error);
      return null;
    }
  }

  async function requestAnalysis(chatInput, maxChars = 300) {
    try {
      const response = await axios.post(
        chatGptApiEndpoint,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: 'user',
              content: chatInput,
            },
          ],
          max_tokens: maxChars,
          temperature: 0.7,
          stop: '\n'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${chatGptApiKey}`,
          },
        }
      );

      if (response.status === 200) {
        let content = response.data.choices[0].message.content;
        return content;
      }
      console.error('ChatGPT request failed.');
      return '';
    } catch (error) {
      console.error('Error sending request to ChatGPT:', error);
      return '';
    }
  }

  async function generateDataDescription(data) {
    try {
      const response = await requestAnalysis(data);

      if (response) {
        return response;
      }

      console.error('Description not received from ChatGPT.');
      return 'No description available';
    } catch (error) {
      console.error('Error generating description:', error);
      return 'Error generating description';
    }
  }

  useEffect(() => {
    // Your data loading logic here
  }, []);

  function calculateTotalData(selectedCircle, selectedRange) {
    // Your data calculation logic here
  }

  const openInfoModal = async (circleData) => {
    // Your modal opening logic here
  };

  function constructChatInput(circleData, barChartData, pieChartData) {
    return `User: ${circleData.location}, Bar Chart: ${barChartData}, Pie Chart: ${pieChartData}`;
  }

  const closeInfoModal = () => {
    setSelectedCircle({});
    setBarChartData(null);
    setPieChartData(null);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleTimeRangeChange = (event, value) => {
    setSelectedRange(value);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }

  const filteredData = data.slice(selectedRange[0], selectedRange[1] + 1);

  return (
    <div className="container-fluid">
      <div id="search-container">
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter a search topic"
            className="form-control"
          />
          <button className="btn btn-primary">
            Search Images
          </button>
        </div>
      </div>
      {data.length > 0 && (
        <div id="slider-container">
          {/* Your slider and timeline code here */}
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <MapContainer
            center={[39.0, 9.0]}
            zoom={5}
            style={{ height: 'calc(100vh)' }}
            id="map-container"
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
            {filteredData.map((item, index) => (
              <Circle
                center={[item.lat, item.lon]}
                radius={50000}
                key={index}
                eventHandlers={{ click: () => openInfoModal(item) }}
              />
            ))}
          </MapContainer>
        </div>
      </div>
      <Modal
        show={selectedCircle.location !== undefined}
        onHide={closeInfoModal}
        dialogClassName="modal-lg"
      >
        {/* Your modal content */}
      </Modal>
    </div>
  );
}

export default App;
