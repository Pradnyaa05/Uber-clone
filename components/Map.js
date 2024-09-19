
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import  { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { MAPBOX_API_KEY } from '@env';
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    const coordinates = [
      [origin.location.lng, origin.location.lat],
      [destination.location.lng, destination.location.lat]
    ];

    mapRef.current?.fitBounds(
      [Math.min(coordinates[0][0], coordinates[1][0]), Math.min(coordinates[0][1], coordinates[1][1])],
      [Math.max(coordinates[0][0], coordinates[1][0]), Math.max(coordinates[0][1], coordinates[1][1])],
      50, // Padding
    );
  }, [origin, destination]);
  // Default coordinates for San Francisco if origin is not set
  const defaultRegion = {
    latitude: origin?.location.lat || 37.78825,
    longitude: origin?.location.lng || -122.4324,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${origin.location.lng},${origin.location.lat};${destination.location.lng},${destination.location.lat}?sources=0&destinations=1&annotations=duration,distance&access_token=${MAPBOX_API_KEY}`
        );
        const data = await res.json();
        dispatch(setTravelTimeInformation(data.durations[0][1]));
      } catch (error) {
        console.error(error);
      }
    };

    getTravelTime();
  }, [origin, destination, dispatch]);


  return (
    <MapView
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={defaultRegion}
    >
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});

