import React, { useState } from 'react';
import { View } from 'react-native';
import MapboxAutocomplete from './MapboxAutocomplete';

const PlacePicker = ({ onPlaceSelected }) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleOriginSelected = (place) => {
    setOrigin(place);
    onPlaceSelected({ origin: place, destination });
  };

  const handleDestinationSelected = (place) => {
    setDestination(place);
    onPlaceSelected({ origin, destination: place });
  };

  return (
    <View>
      <MapboxAutocomplete placeholder="Where From?" onPlaceSelected={handleOriginSelected} />
      <MapboxAutocomplete placeholder="Where To?" onPlaceSelected={handleDestinationSelected} />
    </View>
  );
};

export default PlacePicker;
