import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import MapboxAutocomplete from './MapboxAutocomplete';
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setDestination } from '../slices/navSlice';
import NavFavorites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePlaceSelected = (place) => {
    dispatch(
      setDestination({
        location: place.geometry.coordinates,
        description: place.place_name,
      }),
    );
    navigation.navigate("RideOptionsCard");
  };

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good morning</Text>
      <View style={tw`flex-shrink flex-grow border-t border-gray-200`}>
        <MapboxAutocomplete 
          onPlaceSelected={handlePlaceSelected}
        />
        <NavFavorites/>
      </View>
      <View style={tw`flex-row bg-white justify-evenly px-4 py-2 border-t border-gray-100 mt-auto`}>
      <TouchableOpacity
        onPress={() => navigation.navigate('RideOptionsCard')}
        style={tw`flex flex-row w-24 justify-between bg-black px-4 py-3 rounded-full`}
      >
        <Icon name="car" type="font-awesome" color="white" size={16} />
        <Text style={tw`text-white text-center ml-3`}>Rides</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`flex flex-row w-24 justify-between px-4 py-3 rounded-full`}>
        <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
        <Text style={tw`text-center ml-3`}>Eats</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#dddddf",
    borderRadius: 0,
    fontSize: 12,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
