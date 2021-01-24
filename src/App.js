import React, { useState } from 'react';
import './App.css';
import Dial from './components/dial';
import FormInput from './components/formInput';
import Infobox from './components/infobox';

function App() {
  const [dialRotation, setDialRotation] = useState(0);
  const [displayInfo, setDisplayInfo] = useState({});

  const fetchFromApi = async (lat, lng) => {
    const data = await fetch(
      'https://cors-anywhere.herokuapp.com/' +
        `http://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=${lat}&longitude=${lng}&distance=25&API_KEY=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const jsonData = await data.json();
    return jsonData;
  };

  const getSmokeIndex = async (userInput) => {
    let maxVal = Number.MIN_SAFE_INTEGER;
    let maxValPol = '';
    let maxCategory = '';
    let maxReportingLocation = '';

    fetchFromApi(userInput.lat, userInput.lng)
      .then((jsonData) => {
        if (jsonData.length === 0) {
          throw Error('Error with API');
        }

        const currentDate = new Date().toISOString().split('T')[0];
        console.log(jsonData);

        for (let i = 0; i < jsonData.length; i++) {
          if (jsonData[i].DateForecast.split(' ')[0] === currentDate) {
            if (jsonData[i].AQI > maxVal) {
              maxVal = jsonData[i].AQI;
              maxValPol = jsonData[i].ParameterName;
              maxCategory = jsonData[i].Category.Name;
              maxReportingLocation = jsonData[i].ReportingArea;
            }
          }
        }

        const displayInfo = {
          number: maxVal,
          pollutant: maxValPol,
          category: maxCategory,
          reportingArea: maxReportingLocation,
        };
        setDisplayInfo(displayInfo);
        setDialRotation(rotationHandler(maxVal));
      })
      .catch((error) => {
        console.log(error);
        maxCategory = 'No AQI Data Found';
        maxVal = 0;
        const displayInfo = {
          number: maxVal,
          pollutant: maxValPol,
          category: maxCategory,
          reportingArea: maxReportingLocation,
        };
        setDisplayInfo(displayInfo);
        setDialRotation(rotationHandler(maxVal));
      });
  };

  const rotationHandler = (smokeAQI) => {
    //INPUT 0 - 350 ROTATION 0 - 275

    //INPUT1 0 - 50 ROTATION 0 - 44
    //INPUT2 51 - 100 ROTATION 45 - 90
    //INPUT3 101 - 150 ROTATION 91 - 137
    //INPUT4 151 - 200 ROTATION 138 - 184
    //INPUT5 201 - 300 ROTATION 185 - 230
    //INPUT6 301 - 400 ROTATION 231 - 275
    let input = 0;
    if (smokeAQI >= 0 && smokeAQI <= 50) {
      input = ((smokeAQI - 0) * (44 - 0)) / (50 - 0) + 0;
    } else if (smokeAQI >= 51 && smokeAQI <= 100) {
      input = ((smokeAQI - 51) * (90 - 45)) / (100 - 51) + 45;
    } else if (smokeAQI >= 101 && smokeAQI <= 150) {
      input = ((smokeAQI - 101) * (137 - 91)) / (150 - 101) + 91;
    } else if (smokeAQI >= 151 && smokeAQI <= 200) {
      input = ((smokeAQI - 151) * (184 - 138)) / (200 - 151) + 138;
    } else if (smokeAQI >= 201 && smokeAQI <= 300) {
      input = ((smokeAQI - 201) * (230 - 185)) / (300 - 201) + 185;
    } else if (smokeAQI >= 301) {
      input = ((smokeAQI - 301) * (275 - 231)) / (400 - 301) + 231;
    }
    return input;
  };

  return (
    <div className="App">
      <main>
        <div /*onLoad={getSmokeIndex}*/ className="app-backdrop">
          <section className="wheel-diagram">
            <Dial displayInfo={displayInfo} dialRotation={dialRotation} />
          </section>
          <section className="search-box">
            <FormInput getSmokeIndex={getSmokeIndex} />
          </section>
          <section className="info-box">
            <Infobox displayInfo={displayInfo} />
          </section>
        </div>
        <footer>
          <a href="https://github.com/sjaga003/AirQualityVisualizer">
            View on Github
          </a>
        </footer>
      </main>
    </div>
  );
}

export default App;
