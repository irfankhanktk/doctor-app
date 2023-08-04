// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {horizontalAnimation} from 'utils';
import HotelTabBar from './hotel-tab';
import AllHotels from 'screens/hotel/all-hotels';
import HotelDetails from 'screens/hotel/hotel-details';
import RoomScreen from 'screens/hotel/room-screen';
import AddRoom from 'screens/hotel/add-room';
import AddHotel from 'screens/hotel/add-hotel';
import AddHotelLocation from 'screens/hotel/add-hotel-location';
import AddHotelPrice from 'screens/hotel/add-hotel-price';
import AddHotelAttributes from 'screens/hotel/add-hotel-attributes';
import RecoveryHotels from 'screens/hotel/recovery-hotels';
import EditRoomAvailability from 'screens/hotel/edit-room-availability';
import HotelTopTab from './hotel-top-tab';
import MyBookingList from 'screens/my-booking-list';
const Stack = createNativeStackNavigator();

export default HotelStack = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: colors.primary}} />
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'light-content'}
      />
      <Stack.Navigator
        // initialRouteName="Splash"
        screenOptions={horizontalAnimation}>
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
