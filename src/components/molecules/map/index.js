import { mvs } from 'config/metrices';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
const styles = StyleSheet.create({
    container: {
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
    }
}) => (
    <View style={styles.container}>
        {console.log('coord=>', coord)}
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                ...coord,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
        >
            <Marker coordinate={{ ...coord }} />
        </MapView>
    </View>
);
export default MyMap;