import React from 'react';

const Dial = ({ dialRotation, displayInfo }) => {
  const rotationStyle = {
    transform: `rotate(${dialRotation}deg)`,
    transition: `1s ease`,
  };

  const categoryFontSizeHandler = () => {
    if (
      Object.keys(displayInfo).length === 0 &&
      displayInfo.constructor === Object
    ) {
      return 1;
    }
    let fontSizeNum = 7;
    if (displayInfo.category.length >= 30) {
      fontSizeNum = 2.8;
    } else {
      fontSizeNum = 3.5;
    }
    return `${fontSizeNum}rem`;
  };

  const categoryStyle = {
    color: displayInfo.category === 'Invalid Address' ? 'red' : 'black',
    fontSize: categoryFontSizeHandler(),
    position: `absolute`,
    padding: `33vh 0vw 0vh 0vw`,
    maxWidth: `50%`,
    minWidth: 0,
  };

  return (
    <>
      <img
        // onLoad={rotationHandler}
        className="wheel-image"
        draggable="false"
        src="./Wheel-p.png"
        alt="Wheel"
      />
      <img
        className="pointer"
        draggable="false"
        src="./Pointer2.png"
        alt="Pointer"
        style={rotationStyle}
      />
      <div className="aqi-number">{displayInfo.number}</div>
      <div style={categoryStyle} className="aqi-message">
        {displayInfo.category}
      </div>
    </>
  );
};

export default Dial;
