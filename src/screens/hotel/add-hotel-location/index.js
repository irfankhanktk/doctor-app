import SearchableDropDown from 'components/atoms/searchable-dropdown';
import React, {useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {PrimaryButton} from 'components/atoms/buttons';
import {UTILS} from 'utils';
import {getLocations} from 'services/api/hotel/api-actions';
const AddHotelLocation = props => {
  const {values} = props?.route?.params || {};
  console.log('values in map=>>', values);
  const {navigation} = props;
  const dispatch = useDispatch();
  const {hotel} = useSelector(s => s);
  const {locations} = hotel;
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  // console.log('marker cordinate check===>', markerCoordinates);
  const handleLongPress = event => {
    const {coordinate} = event.nativeEvent;
    // UTILS._returnAddress();
    setMarkerCoordinates(coordinate);
  };

  const [selectedItem, setSelectedItem] = React.useState(null);
  const [region, setRegion] = React.useState({
    // latitude: !user?.location?.latitude || 51.528564,
    // longitude: !user?.location?.longitude || -0.20301,
    latitude: 51.528564,
    longitude: -0.20301,
  });
  const mapRef = useRef(null);

  const handleRegionChange = region => {
    mapRef?.current?.animateToRegion(region, 1000);
  };
  React.useEffect(() => {
    dispatch(getLocations());
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        onPress={() => setMarkerCoordinates(null)}
        onLongPress={handleLongPress}
        style={{flex: 1}}
        initialRegion={{
          ...region,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
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
          onChangeItem={setSelectedItem}
        />
      </View>
      <View style={styles.nextButton}>
        <PrimaryButton
          title="Next"
          onPress={async () => {
            try {
              const addressComponent = await UTILS._returnAddress(
                markerCoordinates?.latitude,
                markerCoordinates?.longitude,
              );
              console.log('addressComponent->>', addressComponent);
              navigation.navigate('AddHotelPrice', {
                ...values,
                address: addressComponent?.fulladdress,
                map_lat: markerCoordinates?.latitude,
                map_lng: markerCoordinates?.longitude,
              });
            } catch (error) {
              console.log('error in map location ::', error);
            }
          }}
        />
      </View>
    </View>
  );
};
export default AddHotelLocation;
