import {useIsFocused} from '@react-navigation/native';
import {appointment_bg, login_bg} from 'assets/doctor/images';
import {IconButton} from 'components/atoms/buttons';
import AppHeader from 'components/atoms/headers';
import {SearchInput} from 'components/atoms/inputs';
import {Row} from 'components/atoms/row';
import AppointmentCounter from 'components/molecules/doctor/appointment-counter';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import PopularPatientCard from 'components/molecules/doctor/popular-patient-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {FlatList} from 'react-native';
import {ImageBackground, ScrollView, View} from 'react-native';
import {
  getAllCategories,
  getAllHospitals,
  getHomeData,
} from 'services/api/doctor/api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {getNotifications} from 'services/api/auth-api-actions';
const Home = props => {
  const {userInfo, unreadNotification, location} = useAppSelector(s => s?.user);
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [homeData, setHomeData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // getDoctorAvailability(2);
    dispatch(getAllCategories());

    dispatch(getAllHospitals());
    (async () => {
      try {
        if (isFocus) {
          const res = await getHomeData(userInfo?.id);
          setHomeData(res);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [isFocus]);

  const uniquePatient = [];
  const seenIds = new Set();

  homeData?.patients?.forEach(entry => {
    if (!seenIds.has(entry.id)) {
      uniquePatient.push(entry);
      seenIds.add(entry.id);
    }
  });

  return (
    <View style={styles.container}>
      <AppHeader
        unreadNotification={unreadNotification}
        notification
        title={`\t${userInfo?.name || t('guest')}`}
        onPress={() => navigate('DoctorUserTab')}
        source={
          userInfo?.avatar_id ? {uri: `${userInfo?.avatar_id}`} : login_bg
        }
      />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerStyle}>
          <ImageBackground source={appointment_bg} style={styles.bgImg}>
            <Regular
              label={t('appointments')}
              style={{fontSize: mvs(24), color: colors.primary}}
            />
          </ImageBackground>
          <Row
            style={{
              marginVertical: mvs(20),
            }}>
            <AppointmentCounter
              onPress={() => navigate('AppointmentsList', {status: 'total'})}
              value={homeData?.counterAppointment?.total ?? '-'}
              label={t('total')}
            />
            <AppointmentCounter
              onPress={() => navigate('AppointmentsList', {status: 'waiting'})}
              value={homeData?.counterAppointment?.waiting ?? '-'}
              label={t('waiting')}
            />
            <AppointmentCounter
              onPress={() =>
                navigate('AppointmentsList', {status: 'confirmed'})
              }
              value={homeData?.counterAppointment?.confirmed ?? '-'}
              label={t('confirmed')}
            />
            <AppointmentCounter
              onPress={() =>
                navigate('AppointmentsList', {status: 'completed'})
              }
              value={homeData?.counterAppointment?.completed ?? '-'}
              label={t('completed')}
            />
          </Row>
          <Row>
            <IconButton
              onPress={() => navigate('AllPatientScreen')}
              containerStyle={{width: '48%'}}
              icon={'user'}
              title={t('patients')}
            />
            <IconButton
              onPress={() => navigate('WalletScreen')}
              icon={'wallet'}
              title={t('payments')}
              containerStyle={{
                // backgroundColor: colors.green,
                backgroundColor: 'red',
                paddingHorizontal: mvs(0),
                width: '48%',
              }}
            />
          </Row>
          <Bold
            label={t('popular_patients')}
            style={{
              fontSize: mvs(20),
              marginBottom: mvs(10),
              marginTop: mvs(20),
            }}
          />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            ListEmptyComponent={
              !loading && <EmptyList label={t('no_patients')} />
            }
            contentContainerStyle={styles.contentContainerStyle}
            data={uniquePatient}
            renderItem={({item, index}) => {
              console.log('unique patients====>', item);
              return (
                <PopularPatientCard
                  key={index}
                  name={item?.name}
                  image={item?.avatar_id ? `${item?.avatar_id}` : false}
                />
              );
            }}
            keyExtractor={(item, index) => index?.toString()}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default Home;
