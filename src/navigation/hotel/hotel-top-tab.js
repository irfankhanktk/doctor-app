import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {mvs} from 'config/metrices';
import {t} from 'i18next';
import {Animated, TouchableOpacity, View} from 'react-native';
import AddHotel from 'screens/hotel/add-hotel';
import AddHotelAttributes from 'screens/hotel/add-hotel-attributes';
import AddHotelLocation from 'screens/hotel/add-hotel-location';
import AddHotelPrice from 'screens/hotel/add-hotel-price';

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.6)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              borderBottomWidth: isFocused ? 1 : 0,
              alignItems: 'center',
              paddingVertical: mvs(10),
            }}>
            <Animated.Text style={{opacity}}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ...
export default HotelTopTab = props => {
  const {route} = props;
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: t('Content'),
        }}
        name="Content"
        component={AddHotel}
        initialParams={{id: route?.params?.id}}
      />
      <Tab.Screen
        options={{
          tabBarLabel: t('Location'),
        }}
        name="Location"
        component={AddHotelLocation}
      />
      <Tab.Screen
        options={{
          tabBarLabel: t('Price'),
        }}
        name="Price"
        component={AddHotelPrice}
      />
      <Tab.Screen
        options={{
          tabBarLabel: t('Attr'),
        }}
        name="Attr"
        component={AddHotelAttributes}
      />
    </Tab.Navigator>
  );
};
