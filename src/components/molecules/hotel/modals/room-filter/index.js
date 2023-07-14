import {PrimaryButton} from 'components/atoms/buttons';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {HalfOutLineInput} from 'components/atoms/outline-iput';
import {Row} from 'components/atoms/row';
import {useAppDispatch} from 'hooks/use-store';
import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import DateRangePicker from '../../../../atoms/date-range-picker/index';
import styles from './styles';
const RoomFilter = ({
  visible = false,
  onClose = () => {},
  filterData,
  setFilterData,
  onClearFilter,
  onApplyFilter,
}) => {
  const {t} = i18n;
  const dispatch = useAppDispatch();
  const {hotel} = useSelector(s => s);
  const {locations, room_filter, rooms} = hotel;
  const [dateVisible, setDateVisible] = React.useState(false);
  const handleInputChange = (key, value) => {
    setFilterData(prevFilterData => ({
      ...prevFilterData,
      [key]: value,
    }));
  };
  const onHandleClose = () => {
    setDateVisible(false);
    onClose();
  };
  return (
    <ModalWrapper
      onBackdropPress={() => onHandleClose()}
      onBackButtonPress={() => onHandleClose()}
      onCloseModal={() => onHandleClose()}
      visible={visible}
      style={[styles.contentContainerStyleModal]}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => onHandleClose()}
          style={{alignSelf: 'flex-end'}}>
          <Entypo name={'circle-with-cross'} color={'black'} size={25} />
        </TouchableOpacity>

        <View style={styles.todayContainer}>
          <DateRangePicker
            visible={dateVisible}
            setVisible={setDateVisible}
            onChangeText={dates => {
              setFilterData(prevFilterData => ({
                ...prevFilterData,
                start_date: dates?.firstDate,
                end_date: dates?.secondDate,
              }));
            }}>
            <Medium
              label={
                !filterData?.start_date
                  ? 'Select date range'
                  : `${moment(filterData?.start_date).format('ll')} to ${moment(
                      filterData?.end_date,
                    ).format('ll')}`
              }
              style={styles.todayText}
            />
          </DateRangePicker>
        </View>
        {!dateVisible && (
          <>
            <Row style={styles.hotelrow}>
              <HalfOutLineInput
                label={t('Childern')}
                value={filterData?.children}
                onChangeText={text => handleInputChange('children', text)}
                placeholder={'0'}
                style={{}}
              />
              <HalfOutLineInput
                label={t('Adults')}
                value={filterData?.adults}
                onChangeText={text => handleInputChange('adults', text)}
                placeholder={'0'}
              />
            </Row>
            <Row>
              <PrimaryButton
                containerStyle={{width: '45%'}}
                title={'Clear Filter'}
                onPress={onClearFilter}
              />
              <PrimaryButton
                containerStyle={{width: '45%'}}
                title={'Apply Filter'}
                onPress={onApplyFilter}
              />
            </Row>
          </>
        )}
      </View>
    </ModalWrapper>
  );
};
export default RoomFilter;
