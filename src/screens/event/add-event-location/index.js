import SearchableDropDown from 'components/atoms/searchable-dropdown';
import React, {useRef, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {PrimaryButton} from 'components/atoms/buttons';
import {UTILS} from 'utils';
import {getLocations} from 'services/api/auth-api-actions';
import {t} from 'i18next';

const AddEventLocation = props => {
  const {values} = props?.route?.params || {};
  const {navigation} = props;
  const dispatch = useDispatch();
  const {event, user, hotel} = useSelector(s => s);
  const {edit_event} = event;
  const {locations} = user;
  const [markerCoordinates, setMarkerCoordinates] = useState(
    edit_event?.row
      ? {
          latitude: edit_event?.row?.map_lat * 1,
          longitude: edit_event?.row?.map_lng * 1,
        }
      : null,
  );

  const [selectedItem, setSelectedItem] = React.useState(null);
  const [region, setRegion] = React.useState({
    latitude: user?.location?.latitude ?? 51.528564,
    longitude: user?.location?.longitude ?? -0.20301,
    latitude: 51.528564,
    longitude: -0.20301,
  });
  const mapRef = useRef(null);
  const handleLongPress = async event => {
    try {
      const {coordinate} = event.nativeEvent;
      const res = await UTILS._returnAddress(
        coordinate?.latitude,
        coordinate?.longitude,
      );
      if (
        res?.city?.toLowerCase() === selectedItem?.title?.toLowerCase() ||
        res?.country?.toLowerCase() === selectedItem?.title?.toLowerCase()
      ) {
        setMarkerCoordinates(coordinate);
      } else {
        if (!selectedItem?.title)
          throw `Please first select location from dropdown`;
        throw `Please Select Location within ${selectedItem?.title}`;
      }
    } catch (error) {
      Alert.alert('Location Error', UTILS.returnError(error));
    }
  };
  React.useEffect(() => {
    if (selectedItem) {
      handleRegionChange({
        latitude: selectedItem?.map_lat * 1,
        longitude: selectedItem?.map_lng * 1,
        // latitude: 31.5055046844182,
        // longitude: 74.34502738081864,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      handleRegionChange({
        ...region,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [selectedItem, region]);
  React.useEffect(() => {
    setRegion(user?.location);
  }, [user]);
  const handleRegionChange = coords => {
    mapRef?.current?.animateToRegion(coords, 1000);
  };
  React.useEffect(() => {
    dispatch(getLocations());
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        onPress={handleLongPress}
        // onLongPress={handleLongPress}
        style={{flex: 1}}
        initialRegion={{
          ...region,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={{
          ...region,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}>
        {markerCoordinates && <Marker coordinate={markerCoordinates} />}
      </MapView>
      <TouchableOpacity
        onPress={() => props?.navigation?.goBack()}
        style={styles.backButton}>
        <AntDesign size={20} name="arrowleft" color={'black'} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <SearchableDropDown
          items={locations}
          selectedItem={selectedItem}
          onChangeItem={item => {
            setSelectedItem(item);
          }}
        />
      </View>
      <View style={styles.nextButton}>
        <PrimaryButton
          title={t('next')}
          onPress={async () => {
            try {
              if (!markerCoordinates) throw 'Please select event location';
              const addressComponent = await UTILS._returnAddress(
                markerCoordinates?.latitude,
                markerCoordinates?.longitude,
              );
              navigation.navigate('AddEventPrice', {
                ...values,
                address: addressComponent?.fulladdress,
                map_lat: markerCoordinates?.latitude,
                map_lng: markerCoordinates?.longitude,
              });
            } catch (error) {
              console.log('error in map location ::', error);
              Alert.alert('Validation Error', UTILS.returnError(error));
            }
          }}
        />
      </View>
    </View>
  );
};
export default AddEventLocation;
