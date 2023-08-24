// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import AddHotel from 'screens/hotel/add-hotel';
import AddHotelAttributes from 'screens/hotel/add-hotel-attributes';
import AddHotelLocation from 'screens/hotel/add-hotel-location';
import AddHotelPrice from 'screens/hotel/add-hotel-price';
import AddRoom from 'screens/hotel/add-room';
import AllHotels from 'screens/hotel/all-hotels';
import EditRoomAvailability from 'screens/hotel/edit-room-availability';
import HotelDetails from 'screens/hotel/hotel-details';
import RecoveryHotels from 'screens/hotel/recovery-hotels';
import RoomScreen from 'screens/hotel/room-screen';
import {horizontalAnimation} from 'utils';
import HotelTabBar from './hotel-tab';
import HotelTopTab from './hotel-top-tab';
const Stack = createNativeStackNavigator();

export default HotelStack = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={horizontalAnimation}>
        <Stack.Screen name="HotelTabBar" component={HotelTabBar} />
        <Stack.Screen name="AllHotels" component={AllHotels} />
        <Stack.Screen name="Recovery" component={RecoveryHotels} />
        <Stack.Screen name="HotelDetails" component={HotelDetails} />
        <Stack.Screen name="RoomScreen" component={RoomScreen} />
        <Stack.Screen name="AddRoom" component={AddRoom} />
        <Stack.Screen name="AddHotel" component={AddHotel} />
        <Stack.Screen name="AddHotelLocation" component={AddHotelLocation} />
        <Stack.Screen name="AddHotelPrice" component={AddHotelPrice} />
        <Stack.Screen name="HotelTopTab" component={HotelTopTab} />
        <Stack.Screen
          name="EditRoomAvailability"
          component={EditRoomAvailability}
        />
        <Stack.Screen
          name="AddHotelAttributes"
          component={AddHotelAttributes}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
