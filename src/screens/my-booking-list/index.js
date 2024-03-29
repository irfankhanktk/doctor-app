import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {FlatList, View, Alert, RefreshControl} from 'react-native';
import i18n from 'translation';
import styles from './styles';
import {UTILS} from 'utils';
import HotelBookingCard from 'components/molecules/hotel/hotel-booking-card';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import {getBookings} from 'services/api/auth-api-actions';
import {
  changeBookingStatus,
  paidBookingAmount,
} from 'services/api/hotel/api-actions';
import {BOOKING_STATUSES, STORAGEKEYS} from 'config/constants';
import PaidAmountModal from 'components/molecules/doctor/modals/paid_modal';
import InvoiceModal from 'components/molecules/doctor/modals/invoice_modal';

const MyBookingList = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [loading, setLoading] = React.useState(true);
  const [bookings, setBookings] = React.useState([]);

  const {userInfo} = useAppSelector(s => s?.user);
  const [paid, setPaid] = React.useState(false);
  const [invoice, setInvoice] = React.useState(false);
  const [bookingItem, setBookingItem] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  const getToken = async item => {
    try {
      const storedToken = await UTILS.getItem(STORAGEKEYS.token);
      if (storedToken !== null) {
        setInvoice(true);
        setBookingItem({...item, bearerToken: storedToken});
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  const isHistory = props?.route?.params;
  // console.log('statsu', bookings?.status);
  const getBook = async () => {
    try {
      if (!userInfo?.id) {
        UTILS.returnAlert();
        return;
      }
      setLoading(true);
      const res = await getBookings();
      console.log('res::::', res?.data?.bookings);
      setBookings(res?.data?.data || []);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getBook();
  }, [userInfo?.id]);
  const renderItem = ({item}) => (
    <HotelBookingCard
      onInvoice={() => getToken(item)}
      onPaid={() => {
        setPaid(true);
        setBookingItem(item);
      }}
      onPress={() =>
        props?.navigation?.navigate('BookingDetails', {
          booking: item,
        })
      }
      onChangeStatus={async status => {
        try {
          const bookingStatus = BOOKING_STATUSES.find(x => x?.id == status);
          const res = await changeBookingStatus({
            id: item?.id,
            action: bookingStatus?.title?.toLowerCase(),
          });
          const copy = [...bookings];
          setBookings(
            copy?.map(x => ({
              ...x,
              status:
                x?.id === item?.id
                  ? bookingStatus?.title?.toLowerCase()
                  : x?.status,
            })),
          );
        } catch (error) {
          Alert.alert(UTILS.returnError(error));
        }
      }}
      item={item}
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getBook()}
            />
          }
          ListEmptyComponent={<EmptyList label={t('no_booking')} />}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={bookings}
          renderItem={renderItem}
          keyExtractor={(_, index) => index?.toString()}
        />
      )}

      <PaidAmountModal
        bookingItem={bookingItem}
        setBookingItem={setBookingItem}
        onClose={() => setPaid(false)}
        visible={paid}
      />
      <InvoiceModal
        bookingItem={bookingItem}
        setBookingItem={setBookingItem}
        onClose={() => setInvoice(false)}
        visible={invoice}
      />
    </View>
  );
};
export default MyBookingList;
