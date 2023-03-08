// In App.js in a new project
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from 'config/colors';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddCard from 'screens/add-card-screen';
import AppointmentDetails from 'screens/appointment-details';
import AppointmentsList from 'screens/appointments-list';
import AvailabilityList from 'screens/availability-list';
import DetailsScreen from 'screens/details-screen';
import ForgotPassword from 'screens/forgot-password';
import LanguageScreen from 'screens/language-screen';
import LoginScreen from 'screens/login-screen';
import RenewPassword from 'screens/renew-password';
import Signup from 'screens/signup';
import AddAvailability from 'screens/add-availability';
import Splash from 'screens/splash';
import UpdatePassword from 'screens/update-password';
import UpdateProfile from 'screens/update-profile';
import { horizontalAnimation } from '../utils';
import TabNavigator from './tab-navigation';
import EditAvailability from 'screens/edit-availability';
import AvailabilityDetails from 'screens/availability-details';
import UpdateAvailability from 'screens/update-availability';
const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.primary }} />
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'light-content'}
      />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={horizontalAnimation}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="RenewPassword" component={RenewPassword} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="AddAvailability" component={AddAvailability} />
          <Stack.Screen name="EditAvailability" component={EditAvailability} />
          <Stack.Screen name="AvailabilityList" component={AvailabilityList} />
          <Stack.Screen name="AvailabilityDetails" component={AvailabilityDetails} />
          <Stack.Screen name="UpdateAvailability" component={UpdateAvailability} />
        </Stack.Group>
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="BottomTab" component={TabNavigator} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="AppointmentsList" component={AppointmentsList} />
        <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, },
});
