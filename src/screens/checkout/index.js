import { PrimaryButton } from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { Loader } from 'components/atoms/loader';
import { Row } from 'components/atoms/row';
import DoctorCheckoutCard from 'components/molecules/doctor-checkout-card';
import PaymentMethodCard from 'components/molecules/payment-method-card';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { ScrollView, View } from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import styles from './styles';

const Checkout = (props) => {
  const { params } = props?.route;
  const { t } = i18n;
  const [loading, setLoading] = React.useState(false);
  const [appointmentDetails, setAppointmentDetails] = React.useState(null);
  const [arrayFormat, setArrayFormat] = React.useState([]);

  // React.useEffect(() => {
  //   (async () => {
  //     const res = await getAppointmentDetails(params?.id, setLoading);
  //     console.log('res of appointment: details ->', res);
  //     setAppointmentDetails(res?.appointment);
  //     setArrayFormat(res?.arrayFormat || []);
  //   })()
  // }, [])
  return (
    <View style={styles.container}>
      <Header1x2x title={t('checkout')} />
      <View style={styles.container}>
        {loading ?
          <Loader />
          : <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <DoctorCheckoutCard
              name={appointmentDetails?.patient?.name}
              subTitle={appointmentDetails?.patient?.designation}
              image={appointmentDetails?.patient?.banner_image_id}
              experience={appointmentDetails?.patient?.experience}
              fee={appointmentDetails?.patient?.price}
              rating={appointmentDetails?.patient?.review_score}
            />
            <PaymentMethodCard
              name={appointmentDetails?.patient?.name}
              subTitle={appointmentDetails?.patient?.designation}
              image={appointmentDetails?.patient?.banner_image_id}
              experience={appointmentDetails?.patient?.experience}
              fee={appointmentDetails?.patient?.price}
              rating={appointmentDetails?.patient?.review_score}
            />
            <Row style={{ alignItems: 'center', marginTop: mvs(30) }}>
              <Bold label={'Total $ '} color={colors.primary}>
                <Bold label={' 38.0'} fontSize={mvs(18)} />
              </Bold>
              <PrimaryButton title={'Pay Now'} containerStyle={{ width: '49%' }} />
            </Row>
          </ScrollView>}
      </View>
    </View>
  );
};
export default Checkout;
