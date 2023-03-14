import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { Loader } from 'components/atoms/loader';
import { Row } from 'components/atoms/row';
import DescriptionCard from 'components/molecules/description-card';
import Hospital from 'components/molecules/hospital';
import DoctorAppointmentDetails from 'components/molecules/popular-patient-card';
// import Hospital from 'components/molecules/hospital';
// import MyMap from 'components/molecules/map';
import moment from 'moment';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { getAppointmentDetails } from 'services/api/api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';

const AppointmentDetails = props => {
  const { params } = props?.route;
  const { t } = i18n;
  const [loading, setLoading] = React.useState(true);
  const [appointmentDetails, setAppointmentDetails] = React.useState(null);
  const [arrayFormat, setArrayFormat] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const res = await getAppointmentDetails(params?.id, setLoading);
      console.log('res of appointment: details ->', res);
      setAppointmentDetails(res?.appointment);
      setArrayFormat(res?.arrayFormat || []);
    })();
  }, []);
  console.log(
    'appointmentDetail appointmentDetails?.doctors=>>',
    appointmentDetails?.doctor,
  );
  return (
    <View style={styles.container}>
      <Header1x2x title={t('appointment_details')} />
      <View style={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <DoctorAppointmentDetails
              name={appointmentDetails?.patient?.name}
              subTitle={appointmentDetails?.patient?.designation}
              image={appointmentDetails?.patient?.banner_image_id}
              experience={appointmentDetails?.patient?.experience}
              fee={appointmentDetails?.patient?.price}
              rating={appointmentDetails?.patient?.review_score}
            />
            <View style={styles.time}>
              <Bold label={moment(appointmentDetails?.date).format('ll')} />
              <Row>
                <Medium label={t('time')} />
                <Medium
                  label={`${arrayFormat[appointmentDetails?.start_time_id]} - ${arrayFormat[appointmentDetails?.end_time_id]
                    }`}
                />
              </Row>
            </View>
            <Bold label={t('reason')} />
            <DescriptionCard
              description={appointmentDetails?.reason}
            />
            <Hospital
              style={styles.hospital}
              item={appointmentDetails?.hospital}
            />
            {/* <MyMap
              coord={!appointmentDetails ? '' : {
                latitude: appointmentDetails?.hospital?.map_lat * 1,
                longitude: appointmentDetails?.hospital?.map_lng * 1,
              }}
            /> */}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
export default AppointmentDetails;
