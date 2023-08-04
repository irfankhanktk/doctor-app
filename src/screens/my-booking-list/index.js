import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {FlatList, View} from 'react-native';
import i18n from 'translation';
import styles from './styles';
import {UTILS} from 'utils';
import HotelBookingCard from 'components/molecules/hotel/hotel-booking-card';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import {getBookings} from 'services/api/auth-api-actions';

const MyBookingList = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [loading, setLoading] = React.useState(true);
  const [bookings, setBookings] = React.useState([]);
  const {userInfo} = useAppSelector(s => s?.user);
  // const isHistory = props?.route?.params?.isHistory;
  const isHistory = props?.route?.params;
  // console.log('statsu', bookings?.status);
  React.useEffect(() => {
    (async () => {
      try {
        if (!userInfo?.id) {
          UTILS.returnAlert();
          return;
        }
        setLoading(true);
        const res = await getBookings();
        // console.log('res::::', res?.data?.bookings);
        setBookings(res?.data?.bookings?.data || []);
      } catch (error) {
        Alert.alert('Error', UTILS.returnError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, [userInfo?.id]);
  const renderItem = ({item}) => (
    <HotelBookingCard
      onPress={() =>
        props?.navigation?.navigate('BookingDetails', {
          booking: item,
        })
      }
      item={item}
      // slotTime={`${arrayFormat[item?.start_time_id]} - ${
      //   arrayFormat[item?.end_time_id]
      // }`}
    />
  );

  return (
    <View style={styles.container}>
      <Header1x2x
        back
        historyScreen={!isHistory ? 'BookingList' : false}
        title={t(isHistory ? 'booking_history' : 'my_bookings')}
        {...props}
      />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          ListEmptyComponent={<EmptyList label={t('no_booking')} />}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={bookings}
          renderItem={renderItem}
          keyExtractor={(_, index) => index?.toString()}
        />
      )}
    </View>
  );
};
export default MyBookingList;
