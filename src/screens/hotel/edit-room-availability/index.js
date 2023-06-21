import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {InputWithIcon} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import RoomAvailabilityModal from 'components/molecules/hotel/modals/availability-room-modal';
import {colors} from 'config/colors';
import {DATE_FORMAT} from 'config/constants';
import {mvs} from 'config/metrices';
import {t} from 'i18next';
import moment from 'moment';
import React, {useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {
  getHotelRooms,
  getRoomAvailability,
  updateRoomAvailability,
} from 'services/api/hotel/api-actions';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import styles from './styles';

const EditRoomAvailability = props => {
  const {navigation, route} = props;
  const {hotel_id} = route?.params;
  const {hotel} = useSelector(s => s);
  const [loading, setLoading] = React.useState(true);
  const [updateLoading, setUpdateLoading] = React.useState(true);
  const [date, setDate] = React.useState(moment('2023-10-10').startOf('month'));
  const [availability, setAvailability] = React.useState([]);

  const [rooms, setRooms] = React.useState([]);
  const [filterModal, setFilterModal] = React.useState(false);
  const [roomSelectModal, setRoomSelectModal] = React.useState(false);
  const [roomId, setRoomId] = useState();
  const refRBSheet = React.useRef();
  const [filterData, setFilterData] = useState({
    start_date: moment().format(DATE_FORMAT.yyyy_mm_dd),
    end_date: moment().format(DATE_FORMAT.yyyy_mm_dd),
    number: '',
    price: '',
    active: '0',
  });

  const getAvailabilty = async () => {
    try {
      setLoading(true);
      const res1 = await getHotelRooms(hotel_id);
      if (!res1?.rows?.data?.length)
        throw new Error('You have no rooms against hotel id');
      const res = await getRoomAvailability(
        hotel_id,
        res1?.rows?.data[0]?.id,
        moment(date).format(DATE_FORMAT.yyyy_mm_dd),
        moment(date).endOf('month').format(DATE_FORMAT.yyyy_mm_dd),
      );
      setRoomId(res1?.rows?.data[0]?.id);
      setRooms(res1?.rows?.data);
      setAvailability(res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  const updateAvailabilty = async () => {
    try {
      setLoading(true);
      const data = {
        active: `${filterData?.active}`,
        price: filterData?.price,
        number: filterData?.number,
        is_instant: 0,
        is_default: true,
        price_html: `$${filterData?.price}`,
        event: `$${filterData?.price}`,
        start_date: filterData?.start_date,
        end_date: filterData?.end_date,
        target_id: roomId,
      };
      const res = await updateRoomAvailability(hotel_id, data);

      await getAvailabilty();
      // setAvailability(res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAvailabilty();
  }, [date]);
  return (
    <View style={styles.container1}>
      <Header1x2x title={t('room_availability')} back={true} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <InputWithIcon
          value={rooms?.find(x => x?.id == roomId)?.title}
          onChangeText={setRoomId}
          items={rooms}
          id={roomId}
        />
        <Row>
          <AntDesign
            name={'leftcircle'}
            size={mvs(25)}
            onPress={() => setDate(pre => moment(pre)?.subtract(1, 'M'))}
          />
          <Row>
            <Regular label={date?.format('ll')} />
            {/* <Regular
                label={moment(new Date(2023, 6, 0)).add().format('ll')}
              /> */}
          </Row>
          <AntDesign
            size={mvs(25)}
            name={'rightcircle'}
            onPress={() => setDate(pre => moment(pre)?.add(1, 'M'))}
          />
        </Row>
        {loading ? (
          <Loader />
        ) : (
          <Row
            style={{
              flexWrap: 'wrap',
            }}>
            <>
              {availability?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setFilterModal(true)}
                    key={index}
                    style={{
                      height: mvs(60),
                      width: mvs(80),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: StyleSheet.hairlineWidth,
                      borderRadius: mvs(10),
                      padding: mvs(3),
                      marginTop: mvs(10),
                      backgroundColor: item?.active
                        ? colors.blueHalf
                        : colors.transparent,
                    }}>
                    <Regular
                      style={{marginTop: mvs(10)}}
                      label={item?.active ? item?.event : item?.title}
                    />
                    <Row style={{position: 'absolute', width: '100%', top: 0}}>
                      <Regular label={moment(item?.start).format('DD')} />
                      <Regular label={moment(item?.start).format('ddd')} />
                    </Row>
                  </TouchableOpacity>
                );
              })}
            </>
          </Row>
        )}
        <RoomAvailabilityModal
          filterData={filterData}
          setFilterData={setFilterData}
          visible={filterModal}
          onClose={setFilterModal}
          onClearFilter={() => setFilterData(initialFilter)}
          onPress={() => {
            setFilterModal(false);
            updateAvailabilty();
          }}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default EditRoomAvailability;
