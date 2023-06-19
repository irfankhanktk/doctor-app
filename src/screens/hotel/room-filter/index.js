import {PrimaryButton} from 'components/atoms/buttons';
import {DatePicker} from 'components/atoms/date-picker';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {HalfOutLineInput} from 'components/atoms/outline-iput';
import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import moment from 'moment';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {setClearRoomFilter, setRoomFilter} from 'store/reducers/hotel-reducer';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import styles from './styles';
const propertyType = [
  {
    title: 'Apartments',
    checked: false,
    id: 35,
  },
  {
    title: 'Hotels',
    checked: false,
    id: 36,
  },
  {
    title: 'Homestays',
    checked: false,
    id: 37,
  },
];
const facilities = [
  {
    title: 'Wake-up call',
    checked: false,
    id: 38,
  },
  {
    title: 'Car hire',
    checked: false,
    id: 39,
  },
  {
    title: 'Bicycle hire',
    checked: false,
    id: 40,
  },
  {
    title: 'Flat Tv',
    checked: false,
    id: 41,
  },
  {
    title: 'Laundry and dry cleaning',
    checked: false,
    id: 45,
  },
  {
    title: 'Internet – Wifi',
    checked: false,
    id: 46,
  },
  {
    title: 'Coffee and tea',
    checked: false,
    id: 47,
  },
];
const services = [
  {
    title: 'Havana Lobby bar',
    checked: false,
    id: 48,
  },
  {
    title: 'Fiesta Restaurant',
    checked: false,
    id: 49,
  },
  {
    title: 'Hotel transport services',
    checked: false,
    id: 50,
  },
  {
    title: 'Free luggage deposit',
    checked: false,
    id: 51,
  },
  {
    title: 'Laundry Services',
    checked: false,
    id: 52,
  },
  {
    title: 'Pets welcome',
    checked: false,
    id: 53,
  },
  {
    title: 'Tickets',
    checked: false,
    id: 54,
  },
];
const RoomFilter = ({
  props,
  style,
  visible = false,
  onClose = () => {},
  onChange,
  url,
}) => {
  const [text, setText] = React.useState('');
  const {t} = i18n;
  const dispatch = useAppDispatch();
  const {hotel} = useSelector(s => s);
  const [loading, setLoading] = React.useState(true);
  const {locations, room_filter, rooms} = hotel;

  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyleModal, style]}>
      <View style={styles.container}>
        <Header1x2x
          style={{height: mvs(60)}}
          isSearch={false}
          title={t('filter_rooms')}
          back={false}
        />
        <View style={styles.cardContainer}>
          <View style={styles.line} />
          <Row style={{alignItems: 'center', paddingHorizontal: mvs(20)}}>
            <PrimaryButton
              title={t('Clear')}
              onPress={() => dispatch(setClearRoomFilter())}
              containerStyle={{width: mvs(100)}}
            />
            <Medium label={`${rooms?.length || 0} Rooms found `} />
          </Row>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: mvs(20)}}>
            <Row style={styles.todayContainer}>
              <DatePicker
                onChangeText={date =>
                  dispatch(setRoomFilter({...room_filter, start_date: date}))
                }>
                <Medium
                  label={moment(room_filter?.start_date).format('ll')}
                  style={styles.todayText}
                />
              </DatePicker>
              <DatePicker
                min={new Date(room_filter?.start_date).setDate(
                  new Date(room_filter?.start_date).getDate() + 1,
                )}
                onChangeText={date =>
                  dispatch(setRoomFilter({...room_filter, end_date: date}))
                }>
                <Medium
                  label={moment(room_filter?.end_date).format('ll')}
                  style={styles.tomarrowText}
                />
              </DatePicker>
            </Row>
            <Row style={styles.hotelrow}>
              <HalfOutLineInput
                label={t('Childern')}
                value={room_filter?.children}
                onChangeText={t =>
                  dispatch(setRoomFilter({...room_filter, children: t}))
                }
                placeholder={'0'}
                style={{}}
              />
              <HalfOutLineInput
                label={t('Adults')}
                value={room_filter?.adults}
                onChangeText={t =>
                  dispatch(setRoomFilter({...room_filter, adults: t}))
                }
                placeholder={'0'}
              />
            </Row>

            {/* <PrimaryButton
              onPress={() => props?.navigation?.navigate('HotelBooking')}
              title={t('search')}
              containerStyle={styles.searchContainer}
            /> */}
          </ScrollView>
        </View>
      </View>
    </ModalWrapper>
  );
};
export default RoomFilter;
