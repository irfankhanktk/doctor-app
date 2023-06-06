import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import Hospital from 'components/molecules/doctor/hospital';
// import Hospital from 'components/molecules/doctor/hospital';

import React from 'react';
import {ScrollView, View} from 'react-native';
import i18n from 'translation';
import styles from './styles';
import MyMap from 'components/molecules/map';

const HospitalDetails = props => {
  const {hospital} = props?.route.params;
  console.log('hospital--->', hospital);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [appointmentDetails, setAppointmentDetails] = React.useState(null);
  const [arrayFormat, setArrayFormat] = React.useState([]);
  return (
    <View style={styles.container}>
      <Header1x2x title={t('hospital_details')} />
      <View style={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <Hospital style={styles.hospital} item={hospital} />
            <MyMap
              coord={
                !hospital
                  ? ''
                  : {
                      latitude: hospital?.map_lat * 1,
                      longitude: hospital?.map_lng * 1,
                    }
              }
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};
export default HospitalDetails;
