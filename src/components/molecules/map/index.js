import {mvs} from 'config/metrices';
import React from 'react';

import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: mvs(239),
    width: '100%',
    marginTop: mvs(20),
    borderRadius: mvs(20),
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const MyMap = ({
  coord = {
    latitude: 37.78825,
    longitude: -122.4324,
  },
  coordinate,
}) => {
  const handleRegionChange = coords => {
    setTimeout(() => {
      mapRef?.current?.animateToRegion(
        {...coords, latitudeDelta: 0.02, longitudeDelta: 0.02},
        1000,
      );
    }, 1000);
  };
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    handleRegionChange(coordinate);
  }, [coordinate]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker coordinate={coordinate} />
      </MapView>
    </View>
  );
};
export default MyMap;
