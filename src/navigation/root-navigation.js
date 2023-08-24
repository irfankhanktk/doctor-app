// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import PaymentGatewayScreen from 'payment-gateway-screen';
import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RenewPasswordScreen from 'screens/Renew_Password';
import WalletScreen from 'screens/Wallet';
import BookingDetails from 'screens/booking-details';
import ForgotPassword from 'screens/doctor/forgot-password';
import RecoveryHotels from 'screens/hotel/recovery-hotels';
import LanguageScreen from 'screens/language-screen';
import LoginScreen from 'screens/login-screen';
import MyBookingList from 'screens/my-booking-list';
import Notifications from 'screens/notifications';
import RenewPassword from 'screens/renew-password';
import Signup from 'screens/signup';
import Splash from 'screens/splash';
import UpdatePassword from 'screens/update-password';
import UpdateProfile from 'screens/update-profile';
import Dashboard from 'screens/vendor-dashboard';
import {horizontalAnimation} from '../utils';
import CarStack from './car/car-stack';
import {DoctorStack} from './doctor/doctor-stack';
import EventStack from './event/event-stack';
import HotelStack from './hotel/hotel-stack';
import TourStack from './tour/tour-stack';
const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: Platform.OS === 'ios' ? insets.top : 0,
      }}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'light-content'}
      />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={horizontalAnimation}>
        <Stack.Group>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="RenewPassword" component={RenewPassword} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="WalletScreen" component={WalletScreen} />
          <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
          <Stack.Screen name="RecoveryHotels" component={RecoveryHotels} />
          <Stack.Screen
            name="RenewPasswordScreen"
            component={RenewPasswordScreen}
          />
        </Stack.Group>
        <Stack.Screen name="DoctorStack" component={DoctorStack} />
        <Stack.Screen name="HotelStack" component={HotelStack} />
        <Stack.Screen name="CarStack" component={CarStack} />
        <Stack.Screen name="EventStack" component={EventStack} />
        <Stack.Screen name="TourStack" component={TourStack} />
        <Stack.Screen name="MyBookingList" component={MyBookingList} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} />
        <Stack.Screen name="Dashboard" component={Dashboard} />

        <Stack.Screen
          name="PaymentGatewayScreen"
          component={PaymentGatewayScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primary},
});
