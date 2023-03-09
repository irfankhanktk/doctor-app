import { useIsFocused } from '@react-navigation/native';
import { appointment_bg } from 'assets/images';
import { IconButton } from 'components/atoms/buttons';
import AppHeader from 'components/atoms/headers';
import { SearchInput } from 'components/atoms/inputs';
import { Row } from 'components/atoms/row';
import AppointmentCounter from 'components/molecules/appointment-counter';
import PopularPatientCard from 'components/molecules/popular-patient-card';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import { navigate } from 'navigation/navigation-ref';
import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { getAllHospitals, getHomeData } from 'services/api/api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import styles from './styles';
const Home = (props) => {
  const { userInfo, location } = useAppSelector(s => s?.user);
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();
  const { t } = i18n;
  const [homeData, setHomeData] = React.useState({});
  React.useEffect(() => {
    // getDoctorAvailability(2);
    dispatch(getAllHospitals());
    (async () => {
      try {
        if (isFocus) {
          const res = await getHomeData(userInfo?.id);
          setHomeData(res);
        }
      } catch (error) {

      }
    })()
  }, [isFocus])
  return (
    <View style={styles.container}>
      <AppHeader title={`${t('greet')} ${userInfo?.name || t('guest')}`} />
      <View style={styles.search}>
        <SearchInput value='' />
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <ImageBackground source={appointment_bg}
            style={{
              height: mvs(200),
              paddingHorizontal: mvs(25),
              paddingVertical: mvs(30)
            }}>
            <Regular label={t('appointments')}
              style={{ fontSize: mvs(24), color: colors.primary }}
            />
          </ImageBackground>
          <Row style={{
            ...colors.shadow,
            borderRadius: mvs(15),
            backgroundColor: colors.white,
            paddingVertical: mvs(10),
            marginVertical: mvs(20),
          }}>

            <AppointmentCounter
              onPress={() => navigate('AppointmentsList', { status: 'total' })}
              value={homeData?.counterAppointment?.total ?? '-'}
              label={'Total'} />
            <AppointmentCounter
              onPress={() => navigate('AppointmentsList', { status: 'waiting' })}
              value={homeData?.counterAppointment?.waiting ?? '-'}
              label={'Waiting'} />
            <AppointmentCounter
              onPress={() => navigate('AppointmentsList', { status: 'confirmed' })}
              value={homeData?.counterAppointment?.confirmed ?? '-'}
              label={'Confirmed'} />
            <AppointmentCounter
              onPress={() => navigate('AppointmentsList', { status: 'completed' })}
              value={homeData?.counterAppointment?.completed ?? '-'}
              label={'Completed'} />

          </Row>
          <Row>
            <IconButton icon={'user'} title={'Patients'} />
            <IconButton icon={'wallet'} title={'Payments'} containerStyle={{
              backgroundColor: colors.green
            }} />
          </Row>
          <Bold label={t('Popular Patients')}
            style={{
              fontSize: mvs(20),
              marginBottom: mvs(10),
              marginTop: mvs(20)
            }} />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{}}>
            <Row>
              {homeData?.patients?.map((item, index) => <PopularPatientCard key={index} name={item?.name} />)}
            </Row>
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
};
export default Home;
