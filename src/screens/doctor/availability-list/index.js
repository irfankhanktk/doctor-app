import {useIsFocused} from '@react-navigation/native';
import {PlusButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import DoctorAvailabilityCard from 'components/molecules/doctor/doctor-availability-card';
import DoctorHospitalCard from 'components/molecules/doctor/doctor-hospital-card';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import {arrayFormat} from 'config/constants';
import {useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {FlatList, View} from 'react-native';
import {
  getDoctorAvailability,
  onDeleteAvailbility,
  onEditAvailbility,
} from 'services/api/doctor/api-actions';
import i18n from 'translation';
import styles from './styles';

const AvailabilityList = props => {
  const {t} = i18n;
  const [loading, setLoading] = React.useState(true);
  const [deleteLoading, setDeleteLoading] = React.useState(0);
  const [availabilities, setAvailabilities] = React.useState([]);
  const {userInfo} = useAppSelector(s => s?.user);
  const isFocus = useIsFocused();
  React.useEffect(() => {
    if (!isFocus) return;
    (async () => {
      try {
        // setLoading(true)
        const res = await getDoctorAvailability(userInfo?.id);
        setAvailabilities(res?.hospital || []);
      } catch (error) {
        console.log('error=>', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [isFocus]);

  const renderAppointmentItem = ({item}) => (
    <DoctorHospitalCard
      onPress={() => navigate('AvailabilityDetails', {hospital_id: item?.id})}
      onPressEdit={() =>
        navigate('UpdateAvailability', {hospital_id: item?.id})
      }
      // onPressDel={() => onDeleteAvailbility(item?.availability_id, setDeleteLoading)}
      onPressDel={() => {}}
      item={item}
    />
  );

  return (
    <View style={styles.container}>
      <Header1x2x title={t('availability')} />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          ListEmptyComponent={<EmptyList label={t('no_availability')} />}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={availabilities}
          renderItem={renderAppointmentItem}
          keyExtractor={(_, index) => index?.toString()}
        />
      )}
      <PlusButton onPress={() => navigate('AddAvailability')} />
    </View>
  );
};
export default AvailabilityList;
