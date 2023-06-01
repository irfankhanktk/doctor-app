import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import DescriptionCard from 'components/molecules/doctor/description-card';
import DoctorAvailability from 'components/molecules/doctor/doctor-availability-card';
import DoctorPersonalInfo from 'components/molecules/doctor/doctor-personal-info';
import DoctorQualification from 'components/molecules/doctor/doctor-qualification';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import AppointmentLocationModal from 'components/molecules/doctor/modals/app-location-modal';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getAllDoctorsByCatId} from 'services/api/doctor/api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import styles from './styles';
const SpecialistDetails = props => {
  const {route} = props;
  const {t} = i18n;
  const {catId, title} = route?.params;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchList, setSearchList] = React.useState([]);
  const [appointmentModal, setAppointmentModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [locationsLoading, setLocationsLoading] = React.useState(false);
  const [locations, setLocations] = React.useState([]);
  const dispatch = useAppDispatch();
  const {doctors} = useAppSelector(s => s?.doctor);
  React.useEffect(() => {
    (async () => {
      dispatch(getAllDoctorsByCatId(catId, setLoading));
    })();
  }, []);
  React.useEffect(() => {
    if (searchTerm?.trim()?.length) {
      const filtered = doctors?.filter(item => {
        const cond =
          searchTerm === '' || item?.name?.match(new RegExp(searchTerm, 'i'));
        if (cond) return item;
      });
      setSearchList(filtered);
    }
  }, [searchTerm]);
  const getLocations = async locations => {
    try {
      setLocationsLoading(true);
      setAppointmentModal(true);
      // const res = await getDoctorLocations(doctorId);
      // console.log('res of availability', res);
      setLocations(locations || []);
    } catch (error) {
      setLocations([]);
      console.log(error);
    } finally {
      setLocationsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header1x2x
        onChangeText={setSearchTerm}
        title={title}
        isSearch
        placeholder={t('search_here')}
      />
      {loading ? (
        <Loader />
      ) : (
        <View style={{flex: 1}}>
          <Medium
            label={`Top ${doctors?.length} ${title}`}
            fontSize={mvs(18)}
            style={styles.heading}
          />
          <FlatList
            ListEmptyComponent={<EmptyList label={t('no_result')} />}
            contentContainerStyle={styles.contentContainerStyle}
            data={searchTerm?.trim()?.length ? searchList : doctors}
            renderItem={({item, index}) => (
              <View style={styles.card}>
                <DoctorPersonalInfo
                  image={item?.banner_image_id}
                  name={item?.name}
                  subTitle={item?.designation}
                  // qualification={item?.short_description}
                />
                <DoctorQualification
                  wait={item?.per_patient}
                  experience={item?.experience}
                  rate={item?.ReviewScore?.score_total}
                />
                <DescriptionCard
                  description={
                    item?.short_description || 'Description will be shown here'
                  }
                />
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                  {item?.locations?.map((ele, index) => (
                    <DoctorAvailability
                      hospitals={ele?.hospitals}
                      item={item}
                      price={item?.price}
                      key={index}
                    />
                  ))}
                </ScrollView>
                <PrimaryButton
                  onPress={() =>
                    getLocations(
                      item?.locations?.map(x => ({...x, price: item?.price})),
                    )
                  }
                  containerStyle={{marginTop: mvs(20)}}
                  title={t('book_appointment')}
                />
                {item?.is_featured && (
                  <View style={styles.heartContainer}>
                    <AntDesign
                      name={'hearto'}
                      color={colors.white}
                      size={mvs(19)}
                    />
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item, index) => index?.toString()}
          />

          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[0, 1, 2]?.map((item, index) => (<View key={index} style={styles.platiniumCard}>
              <Row style={{ justifyContent: 'flex-start', alignItems: 'center', marginBottom: mvs(12) }}>
                <Platinium />
                <Regular label={'Platinum Doctors'} fontSize={mvs(20)} style={{ marginLeft: mvs(25), }} />
              </Row>
              <DoctorPersonalInfo rating={'100% (77)'} subTitle={'12 Years Experience'} />
              <PrimaryButton onPress={() => setAppointmentModal(true)} title={'Book Appointment'} containerStyle={{ marginTop: mvs(20), }} />
            </View>))}
          </ScrollView> */}
          {/* {[0, 1].map((item, index) => <View key={index} style={styles.card}>
            <DoctorPersonalInfo qualification={'M.B.B.S, F.C.P.S (Dermatalogist)'} />
            <DoctorQualification />
            <DescriptionCard />
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {[0, 1, 2].map((item, index) => <DoctorAvailability key={index} />)}
            </ScrollView>
            <PrimaryButton onPress={() => setAppointmentModal(true)} containerStyle={{ marginTop: mvs(20) }} title={'Book Appointment'} />
            <View style={{ ...styles.heartContainer, backgroundColor: colors.primary }}>
              <PlatiniumWhite />
            </View>
          </View>)} */}
        </View>
      )}
      <AppointmentLocationModal
        locationsLoading={locationsLoading}
        items={locations}
        visible={appointmentModal}
        onClose={item => {
          setAppointmentModal(false);
          console.log('item?', item);
          if (item) props?.navigation?.navigate('TimeSlot', item);
        }}
      />
    </View>
  );
};
export default SpecialistDetails;
