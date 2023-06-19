import {DatePicker} from 'components/atoms/date-picker';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {HalfOutLineInput} from 'components/atoms/outline-iput';
import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import moment from 'moment';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {setRoomFilter} from 'store/reducers/hotel-reducer';
import Entypo from 'react-native-vector-icons/Entypo';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import styles from './styles';
import {DATE_FORMAT} from 'config/constants';
const RoomFilter = ({
  props,
  style,

  visible = false,
  onClose = () => {},
  onCloseModal = () => {},
  onChange,
  url,
}) => {
  const {t} = i18n;
  const dispatch = useAppDispatch();
  const {hotel} = useSelector(s => s);
  const {locations, room_filter, rooms} = hotel;
  const [filterData, setFilterData] = useState({
    start_date: moment().format(DATE_FORMAT.yyyy_mm_dd),
    end_date: '',
    children: '',
    adults: '',
  });
  console.log('flter data', filterData);
  const handleInputChange = (key, value) => {
    setFilterData(prevFilterData => ({
      ...prevFilterData,
      [key]: value,
    }));
  };

  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      onCloseModal={() => onCloseModal()}
      visible={visible}
      style={[styles.contentContainerStyleModal, style]}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => onCloseModal()}
          style={{alignSelf: 'flex-end'}}>
          <Entypo name={'circle-with-cross'} color={'black'} size={25} />
        </TouchableOpacity>

        <Row style={styles.todayContainer}>
          <DatePicker
            // onChangeText={date =>
            //   dispatch(setRoomFilter({...room_filter, start_date: date}))
            // }
            onChangeText={date => handleInputChange('start_date', date)}>
            <Medium
              label={moment(filterData?.start_date).format('ll')}
              style={styles.todayText}
            />
          </DatePicker>
          <DatePicker
            min={new Date(filterData?.end_date).setDate(
              new Date(filterData?.end_date).getDate() + 1,
            )}
            onChangeText={date => handleInputChange('end_date', date)}>
            <Medium
              label={moment(filterData?.end_date).format('ll')}
              style={styles.tomarrowText}
            />
          </DatePicker>
        </Row>
        <Row style={styles.hotelrow}>
          <HalfOutLineInput
            label={t('Childern')}
            value={filterData.children}
            onChangeText={text => handleInputChange('children', text)}
            placeholder={'0'}
            style={{}}
          />
          <HalfOutLineInput
            label={t('Adults')}
            value={filterData.adults}
            onChangeText={text => handleInputChange('adults', text)}
            placeholder={'0'}
          />
        </Row>
      </View>
    </ModalWrapper>
  );
};
export default RoomFilter;
