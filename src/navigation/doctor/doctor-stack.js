// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WalletScreen from 'screens/Wallet';
import AddAvailability from 'screens/doctor/add-availability';
import AddCard from 'screens/doctor/add-card-screen';
import AppointmentDetails from 'screens/doctor/appointment-details';
import AppointmentsList from 'screens/doctor/appointments-list';
import AvailabilityDetails from 'screens/doctor/availability-details';
import AvailabilityList from 'screens/doctor/availability-list';
import Checkout from 'screens/doctor/checkout';
import DetailsScreen from 'screens/doctor/details-screen';
import EditAvailability from 'screens/doctor/edit-availability';
import HospitalDetails from 'screens/doctor/hospital-details';
import UpdateAvailability from 'screens/doctor/update-availability';
import LanguageScreen from 'screens/language-screen';
import UpdatePassword from 'screens/update-password';
import UpdateProfile from 'screens/update-profile';
import {horizontalAnimation} from 'utils';
import {TabBar} from './curvedtabs';
const Stack = createNativeStackNavigator();

export const DoctorStack = () => {
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
        <Stack.Screen name="BottomTab" component={TabBar} />

        <Stack.Group>
          <Stack.Screen name="AddAvailability" component={AddAvailability} />
          <Stack.Screen name="EditAvailability" component={EditAvailability} />
          <Stack.Screen name="AvailabilityList" component={AvailabilityList} />
          <Stack.Screen
            name="AvailabilityDetails"
            component={AvailabilityDetails}
          />
          <Stack.Screen
            name="UpdateAvailability"
            component={UpdateAvailability}
          />
        </Stack.Group>
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="AppointmentsList" component={AppointmentsList} />
        <Stack.Screen name="HospitalDetails" component={HospitalDetails} />
        <Stack.Screen name="WalletScreen" component={WalletScreen} />
        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetails}
        />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
