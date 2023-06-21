import {PrimaryButton} from 'components/atoms/buttons';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {HalfOutLineInput} from 'components/atoms/outline-iput';
import {Row} from 'components/atoms/row';
import {useAppDispatch} from 'hooks/use-store';
import moment from 'moment';
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import i18n from 'translation';
import Medium from 'typography/medium-text';

import DateRangePicker from 'components/atoms/date-range-picker';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {Checkbox} from 'components/atoms/checkbox';
import PrimaryInput from 'components/atoms/inputs';
const RoomAvailabilityModal = ({
  visible = false,
  onClose = () => {},
  filterData,
  setFilterData,
  onPress,
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
          <Bold
            label={'Date Infromation'}
            fontSize={mvs(16)}
            style={{alignSelf: 'center'}}
          />
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
            {console.log('filterData:::', filterData)}
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
            <View>
              <Regular
                color={colors.primary}
                fontSize={mvs(16)}
                label={'Status'}
              />
              <Row style={{justifyContent: 'flex-start', marginTop: mvs(5)}}>
                <Checkbox
                  checked={filterData?.active === '1'}
                  onPress={() =>
                    handleInputChange(
                      'active',
                      filterData?.active === '1' ? '0' : '1',
                    )
                  }
                />
                <Regular
                  style={{marginLeft: mvs(15)}}
                  label={'Availabel for booking?'}
                />
              </Row>
            </View>
            <PrimaryInput
              label="price"
              onChangeText={date => handleInputChange('price', date)}
              value={filterData.children}
              placeholder="400"
            />
            <PrimaryInput
              onChangeText={date => handleInputChange('number', date)}
              value={filterData.number}
              label="Number of room"
              placeholder="1"
            />
            <PrimaryButton onPress={onPress} title="Save Changes" />
          </>
        )}
      </View>
    </ModalWrapper>
  );
};
export default RoomAvailabilityModal;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // }
  container: {
    backgroundColor: colors.white,
    padding: mvs(15),
    // height: 220,
    // width: width,
    borderRadius: mvs(20),
  },

  contentContainerStyleModal: {
    width: '100%',

    backgroundColor: colors.transparent,
    paddingHorizontal: 20,
    paddingVertical: 0,
  },

  line: {
    borderWidth: mvs(2),
    borderColor: '#dfdede',
    width: mvs(104),
    alignSelf: 'center',
    marginVertical: mvs(10),
  },
  text: {width: mvs(313), fontSize: 20},
  todayContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    color: colors.primary,
    paddingVertical: mvs(5),
    paddingHorizontal: mvs(6),
    marginVertical: mvs(15),
    borderRadius: mvs(10),
    borderColor: colors.border,
  },
  todayText: {
    color: colors.white,
    backgroundColor: colors.primary,
    paddingVertical: mvs(8),
    paddingHorizontal: mvs(20),
    borderRadius: mvs(7),
    width: '100%',
    textAlign: 'center',
  },
  tomarrowText: {
    color: colors.primary,
    // backgroundColor: colors.primary,
    paddingVertical: mvs(8),
    paddingHorizontal: mvs(20),
    borderRadius: mvs(7),
  },
  searchContainer: {
    marginVertical: mvs(20),
  },
  hotelsimgbackground: {
    height: mvs(500),
    marginTop: 0,
    backgroundColor: colors.primary,
  },
  hotelrow: {
    marginTop: mvs(10),
    flexDirection: 'row',
  },
});
