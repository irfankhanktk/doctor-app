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
import {setCarForEdit} from 'store/reducers/car-reducer';
import {navigate} from 'navigation/navigation-ref';
import {onAddOrUpdateCar} from 'services/api/car/api-actions';

const AddCarLocation = props => {
  const dispatch = useDispatch();
  const {car, user} = useSelector(s => s);
  const {edit_car} = car;
  const {locations} = user;
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
        const addressComponent = await UTILS._returnAddress(
          coordinate?.latitude,
          coordinate?.longitude,
        );
        dispatch(
          setCarForEdit({
            ...edit_car,
            row: {
              ...edit_car?.row,
              map_lat: coordinate?.latitude,
              map_lng: coordinate?.longitude,
              address: addressComponent?.fulladdress,
            },
          }),
        );
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
      console.log('selectedItem=>>', selectedItem);
      handleRegionChange({
        latitude: selectedItem?.map_lat * 1,
        longitude: selectedItem?.map_lng * 1,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      handleRegionChange(
        edit_car?.row?.map_lat
          ? {
              latitude: edit_car?.row?.map_lat * 1,
              longitude: edit_car?.row?.map_lng * 1,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
          : {
              ...region,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
      );
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
        {edit_car?.row?.map_lat && edit_car?.row?.map_lng && (
          <Marker
            coordinate={{
              latitude: edit_car?.row?.map_lat * 1,
              longitude: edit_car?.row?.map_lng * 1,
            }}
          />
        )}
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
            console.log('item::', item);
            setSelectedItem(item);
          }}
        />
      </View>
      <View style={styles.nextButton}>
        <PrimaryButton
          title={t('next')}
          onPress={async () => {
            try {
              if (!edit_car?.row?.map_lat) throw 'Please select car location';
              const res = await onAddOrUpdateCar({...edit_car});
              dispatch(
                setCarForEdit({
                  ...edit_car,
                  row: {
                    ...edit_car.row,
                    id: res?.id,
                  },
                }),
              );
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
export default AddCarLocation;
