import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { MAPBOX_API_KEY } from '@env';

const MapboxAutocomplete = ({ onPlaceSelected }) => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json`,
          {
            params: {
              access_token: MAPBOX_API_KEY,
              autocomplete: true,
              limit: 5,
            },
          }
        );
        setPlaces(response.data.features);
      } catch (error) {
        console.error('Error fetching places from Mapbox:', error);
      }
    } else {
      setPlaces([]);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Where From?"
        value={query}
        onChangeText={fetchPlaces}
      />
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPlaceSelected(item)}>
            <Text style={styles.item}>{item.place_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 0,
    backgroundColor: "white",

  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  
});



export default MapboxAutocomplete;
