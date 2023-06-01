import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import SlotDatePicker from 'components/molecules/doctor/date-slot-picker';
import DoctorPersonalInfo from 'components/molecules/doctor/doctor-personal-info';
import TimeSlotPicker from 'components/molecules/doctor/time-slot-picker';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import moment from 'moment';
import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {getDoctorSlots, onDoctorBooking} from 'services/api/doctor/api-actions';
import i18n from 'translation';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import styles from './styles';

const TimeSlotScreen = props => {
  const {route} = props;
  const {t} = i18n;
  const item = route?.params;
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(s => s?.user?.userInfo);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [bookingLoading, setBookingLoading] = React.useState(false);
  const [slots, setSlots] = React.useState([]);
  const [doctorInfo, setDoctorInfo] = React.useState({});
  const [timeFormat, setTimeFormat] = React.useState([]);
  const [selectedSlotTimeId, setSelectedSlotTimeId] = React.useState(-1);
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getDoctorSlots(
          item?.doctor_id,
          item?.hospital_id,
          moment().add(selectedIndex, 'day').format('DD-MM-YYYY'),
        );
        console.log('res of getDoctorSlots', res);
        setSlots(res?.LocationSlots || []);
        setTimeFormat(res?.arrayFormat || []);
        setDoctorInfo(res?.doctor || {});
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedIndex]);
  const onConfirmBookingPress = async () => {
    if (selectedSlotTimeId === -1) {
      Alert.alert('Error', 'Please select one of the available slots');
      return;
    }
    if (!slots[0]?.id) {
      Alert.alert('Error', 'there is no available slot');
      return;
    }
    Alert.alert('Confirm Booking', 'Are you sure to confirm booking?', [
      {
        text: 'Cancel',
        onPress: async () => console.log('cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confrim',
        onPress: () =>
          dispatch(
            onDoctorBooking(
              {
                doctor_id: item?.doctor_id,
                hospital_id: item?.hospital_id,
                date: moment().add(selectedIndex, 'day').format('YYYY-MM-DD'),
                availability_id: slots[0]?.id,
                slot_id: selectedSlotTimeId,
                user_id: userInfo?.id,
              },
              setBookingLoading,
            ),
          ),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={t('select_time_slot')} />
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <KeyboardAvoidScrollview
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={{paddingHorizontal: mvs(20)}}>
              <DoctorPersonalInfo
                image={doctorInfo?.banner_image_id}
                name={doctorInfo?.name}
                style={styles.doctorInfo}
                location={doctorInfo?.address}
                fee={doctorInfo?.price}
              />
            </View>
            <SlotDatePicker
              onChangeSlot={index => setSelectedIndex(index)}
              dates={new Array(30).fill('').map((x, i) => ({
                day: moment().add(i, 'day').format('dddd'),
                date: moment().add(i, 'day').format('DD'),
              }))}
              selectedIndex={selectedIndex}
            />
            <TimeSlotPicker
              label={t('available_slots')}
              onChangeSlotTime={id => {
                setSelectedSlotTimeId(id);
              }}
              selectedSlotTimeId={selectedSlotTimeId}
              formatArray={timeFormat}
              items={slots[0]?.doctor_availability_slots || []}
            />
            {/* <TimeSlotPicker /> */}
          </KeyboardAvoidScrollview>
          <View style={styles.button}>
            <PrimaryButton
              loading={bookingLoading}
              onPress={() =>
                userInfo?.id
                  ? onConfirmBookingPress()
                  : props?.navigation?.navigate('Login')
              }
              title={t('confirm_booking')}
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default TimeSlotScreen;
