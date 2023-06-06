// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RenewPasswordScreen from 'screens/Renew_Password';
import WalletScreen from 'screens/Wallet';
import ForgotPassword from 'screens/doctor/forgot-password';
import LoginScreen from 'screens/login-screen';
import Notifications from 'screens/notifications';
import RenewPassword from 'screens/renew-password';
import Signup from 'screens/signup';
import Splash from 'screens/splash';
import {horizontalAnimation} from '../utils';
import {DoctorStack} from './doctor/doctor-stack';
import AllHotels from 'screens/hotel/all-hotels';
import HotelDetails from 'screens/hotel/hotel-details';
import RoomScreen from 'screens/hotel/room-screen';
import AddRoom from 'screens/hotel/add-room';
import AddHotel from 'screens/hotel/add-hotel';
import AddHotelLocation from 'screens/hotel/add-hotel-location';
import AddHotelPrice from 'screens/hotel/add-hotel-price';
const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: colors.primary}} />
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'light-content'}
      />
      <Stack.Navigator
        initialRouteName="AllHotels"
        screenOptions={horizontalAnimation}>
        <Stack.Group>
          <Stack.Screen name="AllHotels" component={AllHotels} />
          <Stack.Screen name="HotelDetails" component={HotelDetails} />
          <Stack.Screen name="RoomScreen" component={RoomScreen} />
          <Stack.Screen name="AddRoom" component={AddRoom} />
          <Stack.Screen name="AddHotel" component={AddHotel} />
          <Stack.Screen name="AddHotelLocation" component={AddHotelLocation} />
          <Stack.Screen name="AddHotelPrice" component={AddHotelPrice} />

          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="RenewPassword" component={RenewPassword} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="WalletScreen" component={WalletScreen} />
          <Stack.Screen
            name="RenewPasswordScreen"
            component={RenewPasswordScreen}
          />
        </Stack.Group>
        <Stack.Screen name="DoctorStack" component={DoctorStack} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
