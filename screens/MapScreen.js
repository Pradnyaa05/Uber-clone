import React from 'react';
import { TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements'
import Map from '../components/Map';
import { useDispatch } from 'react-redux'
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import { setDestination, setOrigin } from '../slices/navSlice'

const MapScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <View>
      <TouchableOpacity 
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
        onPress={() => {             
          dispatch(setDestination(null))   
          dispatch(setOrigin(null))    
          navigation.navigate('HomeScreen')
        }
        }
      >
        <Icon
          name='menu'
        />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;