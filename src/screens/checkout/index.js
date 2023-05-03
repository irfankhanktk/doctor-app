import { PrimaryButton } from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { Loader } from 'components/atoms/loader';
import { Row } from 'components/atoms/row';
import OtpModal from 'components/molecules/modals/otp-modal';
import PatientCheckoutCard from 'components/molecules/patient-checkout-card';
import PaymentMethodCard from 'components/molecules/payment-method-card';
import { colors } from 'config/colors';
import { APPOINTMNETSTATUS } from 'config/constants';
import { mvs } from 'config/metrices';
import moment from 'moment';
import React from 'react';
import { Image } from 'react-native';
import { Alert, ScrollView, View, TouchableOpacity } from 'react-native';
import {
  getAppointmentDetails,
  onChangeAppoinmentStatus,
  onCompleteAppoinment,
} from 'services/api/api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { UTILS } from '../../utils';
import styles from './styles';
import PrimaryInput, {
  InputPresciption,
  InputWithIcon,
  PrimaryPhoneInput,
} from '../../components/atoms/inputs';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Checkout = props => {
  const { params } = props?.route;
  const { t } = i18n;
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [isOtpModal, setIsOtpModal] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [statusLoading, setStatusLoading] = React.useState(false);
  const [appointmentDetails, setAppointmentDetails] = React.useState(null);
  const [arrayFormat, setArrayFormat] = React.useState([]);
  const [selectedMethod, setSelectedMethod] = React.useState('cash');
  const [addPrescription, setAddPresciprtion] = React.useState([
    { presciption: '', days: '', time: '' },
  ]);
  React.useEffect(() => {
    (async () => {
      const res = await getAppointmentDetails(params?.id, setLoading);
      console.log('res of appointment: details ->', res);
      setAppointmentDetails(res?.appointment);
      setArrayFormat(res?.arrayFormat || []);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Header1x2x title={t('checkout')} />
      <View style={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <Row style={styles.appoinment}>
              <Medium label={t('appoinment_no')} />
              <Medium
                label={`${appointmentDetails?.id}`}
                style={styles.appoinmentDetails}
              />
            </Row>
            <PatientCheckoutCard
              name={appointmentDetails?.patient?.name}
              address={`${appointmentDetails?.patient?.city || ''} ${appointmentDetails?.patient?.country || ''
                }`}
              image={appointmentDetails?.patient?.banner_image_id}
              experience={appointmentDetails?.patient?.experience}
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
            {console.log('appointmentDetails?.wallet?.balance', selectedMethod)}
            <PaymentMethodCard
              onChange={setSelectedMethod}
              selectedMethod={selectedMethod}
              disableWallet={
                appointmentDetails?.wallet?.balance * 1 <
                appointmentDetails?.price * 1
              }
            />
            <Row style={{ alignItems: 'center', marginTop: mvs(18) }}>
              <Medium
                label={t('prescription_details')}
                style={{ fontSize: mvs(18) }}
              />
              <TouchableOpacity
                onPress={() => {
                  const copy = [...addPrescription];
                  copy.push({ presciption: '' });
                  setAddPresciprtion(copy);
                }}>
                <AntDesign
                  name="pluscircleo"
                  size={mvs(20)}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </Row>

            {addPrescription?.map((item, index) => {
              return (
                <View>
                  <InputPresciption
                    // isRequired
                    // error={
                    //   touched?.short_description && errors?.short_description
                    //     ? t(errors?.short_description)
                    //     : ''
                    // }
                    label={t('short_Presciption')}
                    onPressMinus={() => {
                      const copy = [...addPrescription];
                      copy.splice(index, 1);
                      setAddPresciprtion(copy);
                    }}
                    placeholder={t('short_Presciption')}
                    onChangeText={str => {
                      const copy = [...addPrescription];
                      item.presciption = str;
                      copy[index] = item;
                      setAddPresciprtion(copy);
                    }}
                    onBlur={() => ('short_Presciption', true)}
                    value={addPrescription[index]?.presciption}
                  />
                  <PrimaryInput
                    keyboardType={'numeric'}
                    // error={
                    //   touched?.min_day_before_booking && errors?.min_day_before_booking
                    //     ? t(errors?.min_day_before_booking)
                    //     : ''
                    // }
                    label={t('days')}
                    placeholder={t('days')}
                    onChangeText={str => {
                      const copy = [...addPrescription];
                      item.days = str;
                      copy[index] = item;
                      setAddPresciprtion(copy);
                    }}
                    onBlur={() => ('days', true)}
                    value={addPrescription[index]?.days}
                  />
                  <PrimaryInput
                    label={t('time')}
                    placeholder={t('time')}
                    onChangeText={str => {
                      const copy = [...addPrescription];
                      item.time = str;
                      copy[index] = item;
                      setAddPresciprtion(copy);
                    }}
                    onBlur={() => ('time', true)}
                    value={addPrescription[index]?.time}
                  />
                </View>
              );
            })}
            <Medium
              label={t('prescription_image')}
              style={{ marginTop: mvs(20), fontSize: mvs(18) }}>
              <Regular label={t(' (optional)')} fontSize={mvs(12)} />
            </Medium>
            <TouchableOpacity
              onPress={async () => {
                try {
                  const res = await UTILS._returnImageGallery();
                  setImage(res);
                } catch (error) {
                  console.log('error', error);
                }
              }}
              style={styles.img}>
              {!image ? (
                <Regular label={t('choose_pres_img')} />
              ) : (
                <Image source={{ uri: image?.uri }} style={styles.imgStyle} />
              )}
            </TouchableOpacity>
            <Row style={{ alignItems: 'center', marginTop: mvs(30) }}>
              <Bold label={'Total '} color={colors.primary}>
                <Bold
                  label={`${appointmentDetails?.price}`}
                  fontSize={mvs(18)}
                />
              </Bold>
              <PrimaryButton
                loading={statusLoading}
                onPress={async () => {
                  try {
                    await onChangeAppoinmentStatus(
                      appointmentDetails?.id,
                      APPOINTMNETSTATUS.completed,
                      setStatusLoading,
                    );
                    setIsOtpModal(true);
                  } catch (error) {
                    console.log('error=>>>:', error);
                  }
                }}
                title={'Generate Otp'}
                containerStyle={{ width: '49%' }}
              />
            </Row>
          </ScrollView>
        )}
      </View>
      <OtpModal
        disabled={statusLoading}
        loading={statusLoading}
        email={appointmentDetails?.patient?.email}
        visible={isOtpModal}
        value={value}
        setValue={setValue}
        onClose={() => setIsOtpModal(false)}
        onPress={async () => {
          try {
            await onCompleteAppoinment(
              {
                appointment_id: appointmentDetails?.id,
                amount: appointmentDetails?.price || 100,
                payment_method: selectedMethod,
                otp: value,
                image,
                // medicine_receipt: [...addPrescription],
              },
              addPrescription,
              setStatusLoading,
            );
            Alert.alert(
              'Congratulation',
              'You have completed appointment successfully',
            );
            setIsOtpModal(false);
            props?.navigation?.pop(3);
          } catch (error) {
            console.log('error=>>>:', error);
          }
        }}
      />
    </View>
  );
};
export default Checkout;
