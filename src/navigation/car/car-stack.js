// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AllCars from 'screens/car/all-cars';
import CarDetailsScreen from 'screens/car/car-details-screen';
import CarFilterScreen from 'screens/car/car-filter-screen';
import EditCarAvailability from 'screens/car/edit-car-availability';
import RecoveryCars from 'screens/car/recovery-cars';
import AddHotelPrice from 'screens/hotel/add-hotel-price';
import {horizontalAnimation} from 'utils';
import CarTabBar from './car-tab';
import CarTopTab from './car-top-tab';
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
        <Stack.Screen name="CarTopTab" component={CarTopTab} />

        <Stack.Screen
          name="EditCarAvailability"
          component={EditCarAvailability}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
