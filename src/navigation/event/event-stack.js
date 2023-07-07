// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddEvent from 'screens/event/add-event';
import AddEventAttributes from 'screens/event/add-event-attributes';
import AddEventLocation from 'screens/event/add-event-location';
import AddEventPrice from 'screens/event/add-event-price';
import AllEvents from 'screens/event/all-events';
import EventDetailsScreen from 'screens/event/event-details-screen';
import EventFilterScreen from 'screens/event/event-filter-screen';
import RecoveryEvents from 'screens/event/recovery-events';
import {horizontalAnimation} from 'utils';
import EventTabBar from './event-tab';
import AddHotelPrice from 'screens/hotel/add-hotel-price';
import EditEventAvailability from 'screens/event/edit-event-availability';
const Stack = createNativeStackNavigator();

export default EventStack = () => {
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
        <Stack.Screen name="EventTabBar" component={EventTabBar} />
        <Stack.Screen name="AllEvents" component={AllEvents} />
        <Stack.Screen name="EventFilterScreen" component={EventFilterScreen} />
        <Stack.Screen name="RecoveryEvents" component={RecoveryEvents} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="AddHotelPrice" component={AddHotelPrice} />
        {/* <Stack.Screen name="RoomScreen" component={RoomScreen} /> */}
        {/* <Stack.Screen name="AddRoom" component={AddRoom} /> */}
        <Stack.Screen name="AddEvent" component={AddEvent} />
        <Stack.Screen name="AddEventLocation" component={AddEventLocation} />
        <Stack.Screen name="AddEventPrice" component={AddEventPrice} />

        <Stack.Screen
          name="EditEventAvailability"
          component={EditEventAvailability}
        />
        <Stack.Screen
          name="AddEventAttributes"
          component={AddEventAttributes}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
