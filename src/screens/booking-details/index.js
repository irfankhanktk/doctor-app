import {Hotels_Bg} from 'assets/car/images';
import {DoctorMap} from 'assets/doctor/icons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import moment from 'moment';
import React from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';

const BookingDetails = props => {
  const {t} = i18n;
  // const {userInfo} = useAppSelector(s => s?.user);
  const [loading, setLoading] = React.useState(false);
  const [historyData, setHistoryData] = React.useState({});

  return (
    <View style={styles.container}>
      <ImageBackground source={Hotels_Bg} style={styles.hotelsimgbackground}>
        <Header1x2x
          style={{height: mvs(200)}}
          isSearch={false}
          title={t('booking_details')}
          back={true}
        />
      </ImageBackground>

      {loading ? (
        <Loader />
      ) : (
        <View style={styles.cardContainer}>
          <View style={styles.line} />
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <Medium
              style={styles.text}
              label={historyData?.booking?.service?.title}
            />
            <Row style={{justifyContent: 'flex-start'}}>
              <DoctorMap />
              <Medium
                label={historyData?.booking?.service?.address}
                style={{marginHorizontal: mvs(10)}}
              />
            </Row>
            <Row
              style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: mvs(10),
              }}>
              <AntDesign
                name="infocirlce"
                color={colors.primary}
                size={mvs(16)}
              />
              <Medium
                label={`Vendor: ${historyData?.vendor?.name}`}
                style={{marginLeft: mvs(10)}}
                color={colors.primary}
              />
            </Row>
            <Medium label={t('booking_details')} style={styles.heading} />
            <View style={styles.contentContainerStyleNew}>
              <Row style={styles.alignItems}>
                <Row style={styles.alignItems}>
                  <Feather name={'log-in'} size={15} color={colors.green} />
                  <Medium
                    label={t(`check_in`)}
                    style={{...styles.label, marginLeft: mvs(10)}}
                  />
                </Row>
                <Medium
                  label={moment(historyData?.booking?.start_date).format(
                    'DD/MM/YYYY',
                  )}
                  style={styles.slotTime}
                />
              </Row>
              <Row style={styles.alignItems}>
                <Row style={styles.alignItems}>
                  <Feather name={'log-out'} size={15} color={colors.red} />
                  <Medium
                    label={t`check_out`}
                    style={{...styles.label, marginLeft: mvs(10)}}
                  />
                </Row>
                <Medium
                  label={moment(historyData?.booking?.end_date).format(
                    'DD/MM/YYYY',
                  )}
                  style={styles.slotTime}
                />
              </Row>
              <View>
                <Row style={{alignItems: 'center'}}>
                  <Medium label={t('no_of_nights')} style={styles.label} />
                  <Regular
                    label={historyData?.booking?.duration_nights}
                    style={styles.value}
                  />
                </Row>
                <Row style={{alignItems: 'center'}}>
                  <Medium label={t('no_of_adults')} style={styles.label} />
                  <Regular
                    label={historyData?.booking?.adults}
                    style={styles.value}
                  />
                </Row>
              </View>
            </View>
            <Medium label={t('room_details')} style={styles.heading} />
            <View style={styles.contentContainerStyleNew}>
              <View>
                {historyData?.booking?.rooms?.map((item, index) => (
                  <Row style={{alignItems: 'center'}}>
                    <Medium
                      label={`${item?.room?.title}*${item?.number}`}
                      style={styles.label}
                    />
                    <Regular
                      label={`$${item?.price * item?.number}`}
                      style={styles.value}
                    />
                  </Row>
                ))}
                <Medium label={'Extra prices'} color={colors.black} />
                {historyData?.booking?.extra_price.map((item, index) => (
                  <Row style={{alignItems: 'center'}}>
                    <Medium label={item?.name} style={styles.label} />
                    <Regular label={`$${item?.price}`} style={styles.value} />
                  </Row>
                ))}
                <Row style={{alignItems: 'center'}}>
                  <Medium label={'Service Fee'} style={styles.label} />
                  <Regular
                    label={historyData?.booking?.service?.service_fee || '$0'}
                    style={styles.value}
                  />
                </Row>
              </View>
            </View>

            <Row style={{alignItems: 'center'}}>
              <Medium label={t('Total')} fontSize={mvs(18)} />
              <Medium
                label={`$${historyData?.booking?.total}`}
                color={colors.primary}
                fontSize={mvs(20)}
              />
            </Row>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
export default BookingDetails;
