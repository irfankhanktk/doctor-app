import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import AppointmentCard from 'components/molecules/appointment-card';
import {EmptyList} from 'components/molecules/empty-list';
import {APPOINTMNETSTATUS} from 'config/constants';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {goBack, navigate} from 'navigation/navigation-ref';
import React from 'react';
import {FlatList, View} from 'react-native';
import {
  getAppointmentsList,
  onChangeAppoinmentStatus,
} from 'services/api/api-actions';
import i18n from 'translation';
import styles from './styles';

const AppointmentsList = props => {
  const {status} = props?.route?.params || {status: 'total'};
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [loading, setLoading] = React.useState(true);
  const [statusLoading, setStatusLoading] = React.useState(false);
  const [arrayFormat, setArrayFormat] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]);
  const {userInfo} = useAppSelector(s => s?.user);
  React.useEffect(() => {
    (async () => {
      const res = await getAppointmentsList(userInfo?.id, setLoading, status);
      setAppointments(res?.listOfAppointments || []);
      setArrayFormat(res?.arrayFormat || []);
    })();
  }, []);
  const renderAppointmentItem = ({item, index}) => (
    <AppointmentCard
      onPressStatus={async status => {
        try {
          console.log('status=>', status);
          if (status === APPOINTMNETSTATUS.completed) {
            navigate('Checkout', {
              id: item?.id,
            });
          } else {
            setStatusLoading(item?.id);
            await onChangeAppoinmentStatus(item?.id, status, () => {});
            goBack();
          }
        } catch (error) {
          console.log('Error ', error);
        } finally {
          setStatusLoading(false);
        }
      }}
      onPress={() =>
        props?.navigation?.navigate('AppointmentDetails', {
          id: item?.id,
        })
      }
      item={item}
      statusLoading={statusLoading === item?.id}
      slotTime={`${arrayFormat[item?.start_time_id]} - ${
        arrayFormat[item?.end_time_id]
      }`}
    />
  );

  return (
    <View style={styles.container}>
      <Header1x2x title={t('appointments')} />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          ListEmptyComponent={<EmptyList label={t('no_appointment')} />}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={appointments}
          renderItem={renderAppointmentItem}
          keyExtractor={(item, index) => index?.toString()}
        />
      )}
    </View>
  );
};
export default AppointmentsList;
