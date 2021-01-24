import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const FormInput = ({ getSmokeIndex }) => {
  const [userInput, setUserInput] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const submitHandler = (e) => {
    e.preventDefault();
    if (userInput !== '') {
      getSmokeIndex(coordinates);
    }
    setUserInput('');
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setUserInput(value);
    setCoordinates(latLng);
  };

  return (
    <form>
      <PlacesAutocomplete
        value={userInput}
        onChange={setUserInput}
        onSelect={handleSelect}
        highlightFirstSuggestion={true}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              value={userInput}
              placeholder="Enter address or zip code"
              className="form-input"
              {...getInputProps()}
            />
            <button
              onClick={submitHandler}
              className="form-submit"
              type="submit"
            >
              <i className="im im-location"></i>
            </button>
            <div className="dropdown">
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active ? '#5f6cb3' : '#ffff',
                };
                return (
                  <div
                    className="dropdown-item"
                    key={suggestion.id}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </form>
  );
};

export default FormInput;
