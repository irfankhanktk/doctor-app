// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddTour from 'screens/tour/add-tour';
import AddTourAttributes from 'screens/tour/add-tour-attributes';
import AddTourLocation from 'screens/tour/add-tour-location';
import AddTourPrice from 'screens/tour/add-tour-price';
import AllTours from 'screens/tour/all-tours';
import TourDetailsScreen from 'screens/tour/tour-details-screen';
import TourFilterScreen from 'screens/tour/tour-filter-screen';
import RecoveryTours from 'screens/tour/recovery-tours';
import {horizontalAnimation} from 'utils';
import TourTabBar from './tour-tab';
import AddHotelPrice from 'screens/hotel/add-hotel-price';
import EditTourAvailability from 'screens/tour/edit-tour-availability';
const Stack = createNativeStackNavigator();

export default TourStack = () => {
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
        <Stack.Screen name="TourTabBar" component={TourTabBar} />
        <Stack.Screen name="AllTours" component={AllTours} />
        <Stack.Screen name="TourFilterScreen" component={TourFilterScreen} />
        <Stack.Screen name="Recovery" component={RecoveryTours} />
        <Stack.Screen name="TourDetails" component={TourDetailsScreen} />
        <Stack.Screen name="AddHotelPrice" component={AddHotelPrice} />
        {/* <Stack.Screen name="RoomScreen" component={RoomScreen} /> */}
        {/* <Stack.Screen name="AddRoom" component={AddRoom} /> */}
        <Stack.Screen name="AddTour" component={AddTour} />
        <Stack.Screen name="AddTourLocation" component={AddTourLocation} />
        <Stack.Screen name="AddTourPrice" component={AddTourPrice} />

        <Stack.Screen
          name="EditTourAvailability"
          component={EditTourAvailability}
        />
        <Stack.Screen name="AddTourAttributes" component={AddTourAttributes} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
