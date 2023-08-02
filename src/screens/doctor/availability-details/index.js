import {PlusButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import DoctorAvailabilityCard from 'components/molecules/doctor/doctor-availability-card';
import DoctorHospitalCard from 'components/molecules/doctor/doctor-hospital-card';
import DoctorHospitalDetailsCard from 'components/molecules/doctor/doctor-hospital-details-card';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import {arrayFormat} from 'config/constants';
import {useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {FlatList, View} from 'react-native';
import {
  getDoctorAvailabilityDetails,
  onDeleteAvailbility,
} from 'services/api/doctor/api-actions';
import i18n from 'translation';
import styles from './styles';

const AvailabilityDetails = props => {
  const {t} = i18n;
  const [loading, setLoading] = React.useState(true);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [availabilities, setAvailabilities] = React.useState([]);
  const [hospital, setHospital] = React.useState({});
  const {userInfo} = useAppSelector(s => s?.user);
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getDoctorAvailabilityDetails(
          userInfo?.id,
          props?.route?.params?.hospital_id,
        );
        setAvailabilities(res?.availability || []);
        setHospital(res?.hospital || {});
      } catch (error) {
        console.log('error=>', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderAppointmentItem = ({item}) => (
    <DoctorAvailabilityCard
      onPressDel={() => onDeleteAvailbility(item?.id, setDeleteLoading)}
      deleteLoading={deleteLoading === item?.id}
      onPressEdit={() => {}}
      hospitals={item?.hospitals}
      day={item?.day}
      startTime={arrayFormat[item?.start_time]?.title}
      endTime={arrayFormat[item?.end_time]?.title}
    />
  );

  return (
    <View style={styles.container}>
      <Header1x2x back title={t('availability_details')} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <DoctorHospitalDetailsCard
            onPress={() => {}}
            onPressDel={() => {}}
            onPressEdit={() => {}}
            item={hospital}
          />
          <FlatList
            ListEmptyComponent={<EmptyList label={t('no_availability')} />}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            data={availabilities}
            renderItem={renderAppointmentItem}
            keyExtractor={(_, index) => index?.toString()}
          />
        </>
      )}
    </View>
  );
};
export default AvailabilityDetails;
