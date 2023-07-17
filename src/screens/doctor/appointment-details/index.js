import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import DescriptionCard from 'components/molecules/doctor/description-card';
import Hospital from 'components/molecules/doctor/hospital';
import DoctorAppointmentDetails from 'components/molecules/doctor/popular-patient-card';
// import Hospital from 'components/molecules/doctor/hospital';
// import MyMap from 'components/molecules/doctor/map';
import moment from 'moment';
import React from 'react';
import {Image, Platform, ScrollView, View} from 'react-native';
import {
  getAppointmentDetails,
  onChangeAppoinmentStatus,
} from 'services/api/doctor/api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
import {mvs, width} from 'config/metrices';
import {colors} from 'config/colors';
import {PrimaryButton} from 'components/atoms/buttons';
import {APPOINTMNETSTATUS} from 'config/constants';
import {navigate} from 'navigation/navigation-ref';
const AppointmentDetails = props => {
  const [statusLoading, setStatusLoading] = React.useState(false);
  const {params} = props?.route;
  const {t} = i18n;
  const [loading, setLoading] = React.useState(true);
  const [appointmentDetails, setAppointmentDetails] = React.useState(null);
  const [arrayFormat, setArrayFormat] = React.useState([]);
  const [prescriptionData, setPrescriptionData] = React.useState([
    {
      description: 'Panadol',
      days: '12',
      time: 'morning and eveving',
    },
    {
      description: 'Panadol',
      days: '12',
      time: 'morning and eveving',
    },
    {
      description: 'Panadol',
      days: '12',
      time: 'morning and eveving',
    },
  ]);
  const onPressStatus = async status => {
    try {
      if (status === APPOINTMNETSTATUS.completed) {
        navigate('Checkout', {
          id: appointmentDetails?.id,
        });
      } else {
        setStatusLoading(true);
        await onChangeAppoinmentStatus(
          appointmentDetails?.id,
          status,
          () => {},
        );
        props?.navigation?.pop(2);
      }
    } catch (error) {
      console.log('Error ', error);
    } finally {
      setStatusLoading(false);
    }
  };
  React.useEffect(() => {
    (async () => {
      const res = await getAppointmentDetails(params?.id, setLoading);
      setAppointmentDetails(res?.appointment);
      setArrayFormat(res?.arrayFormat || []);
    })();
  }, []);

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
                  label={`${arrayFormat[appointmentDetails?.start_time_id]} - ${
                    arrayFormat[appointmentDetails?.end_time_id]
                  }`}
                />
              </Row>
            </View>

            {appointmentDetails?.medicine_receipt && (
              <View>
                <Bold label={t('prescription_card_heading')} />
                {appointmentDetails?.medicine_receipt?.map((item, index) => {
                  return (
                    <View style={styles.prescriptioncard}>
                      {/* <Bold label={item?.description} /> */}
                      <Row>
                        <Medium label={'Medicine Name:'} />
                        <Medium label={item?.presciption} />
                      </Row>
                      <Row>
                        <Medium label={'Days:'} />
                        <Medium label={item?.days} />
                      </Row>
                      <Row>
                        <Medium label={'Time:'} />
                        <Medium label={item?.time} />
                      </Row>
                    </View>
                  );
                })}
              </View>
            )}
            <Bold label={t('reason')} />
            <DescriptionCard description={appointmentDetails?.reason} />
            {appointmentDetails?.image ? (
              <>
                <Bold label={t('prescription_image')} />
                <Image
                  source={{uri: appointmentDetails?.image}}
                  style={{
                    height: mvs(150),
                    width: '100%',
                    marginBottom: mvs(20),
                    borderRadius: mvs(10),
                  }}
                />
              </>
            ) : null}
            <Bold label={t('hospital')} />
            <Hospital
              onPress={() =>
                props?.navigation?.navigate('HospitalDetails', {
                  hospital: appointmentDetails?.hospital,
                })
              }
              style={styles.hospital}
              item={appointmentDetails?.hospital}
            />
            <View
              style={{
                position: 'absolute',
                width: '100%',
                bottom: 0,
                paddingBottom: mvs(Platform.OS === 'ios' ? 40 : 20),
              }}></View>
          </ScrollView>
        )}
        {!loading && appointmentDetails?.status != 'completed' && (
          <PrimaryButton
            loading={statusLoading}
            disabled={
              appointmentDetails?.status === 'completed' || statusLoading
            }
            onPress={() => {
              onPressStatus(
                appointmentDetails?.status === APPOINTMNETSTATUS?.confirmed
                  ? APPOINTMNETSTATUS?.completed
                  : appointmentDetails?.status === APPOINTMNETSTATUS?.waiting
                  ? APPOINTMNETSTATUS?.confirmed
                  : APPOINTMNETSTATUS?.completed,
              );
            }}
            containerStyle={{
              marginVertical: mvs(10),
              width: width - mvs(40),
              alignSelf: 'center',
            }}
            title={t(
              appointmentDetails?.status === APPOINTMNETSTATUS?.confirmed
                ? 'checkout'
                : appointmentDetails?.status === 'completed'
                ? 'completed'
                : 'confirm',
            )}
          />
        )}
      </View>
    </View>
  );
};
export default AppointmentDetails;
