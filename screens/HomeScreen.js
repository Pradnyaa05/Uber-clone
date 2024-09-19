import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { useDispatch } from 'react-redux';
import { setOrigin } from '../slices/navSlice';
import MapboxAutocomplete from '../components/MapboxAutocomplete';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const handlePlaceSelected = (place) => {
    const { center, place_name } = place;
    dispatch(
      setOrigin({
        location: {
          lat: center[1],
          lng: center[0],
        },
        description: place_name,
      })
    );
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
          source={{ uri: 'https://links.papareact.com/gzs' }}
        />

        <MapboxAutocomplete onPlaceSelected={handlePlaceSelected} />

        <NavOptions />
         <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
