import React from 'react';

const Infobox = ({ displayInfo }) => {
  const aqiDescriptinoHandler = () => {
    const category = displayInfo.category;
    if (category === 'Good') {
      return 'Air quality is satisfactory, and air pollution poses little or no risk.';
    } else if (category === 'Moderate') {
      return 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.';
    } else if (category === 'Unhealthy for Sensitive Groups') {
      return 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.';
    } else if (category === 'Unhealthy') {
      return 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.';
    } else if (category === 'Very Unhealthy') {
      return 'Health alert: The risk of health effects is increased for everyone.';
    } else if (category === 'Hazardous') {
      return 'Health warning of emergency conditions: everyone is more likely to be affected.';
    } else {
      return '';
    }
  };

  return (
    <>
      <div className="pol-name">{displayInfo.pollutant}</div>
      <div className="aqi-description">{aqiDescriptinoHandler()}</div>
      <div className="reporting-area">{displayInfo.reportingArea}</div>
    </>
  );
};

export default Infobox;
