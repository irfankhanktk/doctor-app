// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddCar from 'screens/car/add-car';
import AddCarAttributes from 'screens/car/add-car-attributes';
import AddCarLocation from 'screens/car/add-car-location';
import AddCarPrice from 'screens/car/add-car-price';
import AllCars from 'screens/car/all-cars';
import CarDetailsScreen from 'screens/car/car-details-screen';
import CarFilterScreen from 'screens/car/car-filter-screen';
import RecoveryCars from 'screens/car/recovery-cars';
import {horizontalAnimation} from 'utils';
import CarTabBar from './car-tab';
import AddHotelPrice from 'screens/hotel/add-hotel-price';
import EditCarAvailability from 'screens/car/edit-car-availability';
const Stack = createNativeStackNavigator();

export default CarStack = () => {
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
        <Stack.Screen name="CarTabBar" component={CarTabBar} />
        <Stack.Screen name="AllCars" component={AllCars} />
        <Stack.Screen name="CarFilterScreen" component={CarFilterScreen} />
        <Stack.Screen name="Recovery" component={RecoveryCars} />
        <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
        <Stack.Screen name="AddHotelPrice" component={AddHotelPrice} />
        {/* <Stack.Screen name="RoomScreen" component={RoomScreen} /> */}
        {/* <Stack.Screen name="AddRoom" component={AddRoom} /> */}
        <Stack.Screen name="AddCar" component={AddCar} />
        <Stack.Screen name="AddCarLocation" component={AddCarLocation} />
        <Stack.Screen name="AddCarPrice" component={AddCarPrice} />

        <Stack.Screen
          name="EditCarAvailability"
          component={EditCarAvailability}
        />
        <Stack.Screen name="AddCarAttributes" component={AddCarAttributes} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
