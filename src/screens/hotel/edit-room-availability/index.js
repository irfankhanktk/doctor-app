import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Loader} from 'components/atoms/loader';
import {t} from 'i18next';
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';
import {
  getHotelRooms,
  getRoomAvailability,
  updateRoomAvailability,
} from 'services/api/hotel/api-actions';
import {UTILS} from 'utils';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import Regular from 'typography/regular-text';
import moment from 'moment';
import {Row} from 'components/atoms/row';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DATE_FORMAT} from 'config/constants';
const EditRoomAvailability = props => {
  const {navigation, route} = props;
  const {hotel_id} = route?.params;
  const {hotel} = useSelector(s => s);
  const [loading, setLoading] = React.useState(true);
  const [updateLoading, setUpdateLoading] = React.useState(true);
  const [date, setDate] = React.useState(moment('2023-10-10').startOf('month'));
  const [availability, setAvailability] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
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
        price: 350,
        number: 9,
        is_instant: 0,
        is_default: true,
        price_html: '$350',
        event: '$350',
        start_date: moment(date).format(DATE_FORMAT.yyyy_mm_dd),
        end_date: moment(date).endOf('month').format(DATE_FORMAT.yyyy_mm_dd),
        target_id: 36,
      };
      const res = await updateRoomAvailability(data);
      console.log('res::::>>>', res);
      // setAvailability(res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getAvailabilty();
  }, []);
  return (
    <View style={styles.container1}>
      <Header1x2x title={t('room_availability')} back={true} />

      {loading ? (
        <Loader />
      ) : (
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.contentContainerStyle}>
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
          <Row
            style={{
              flexWrap: 'wrap',
            }}>
            {availability?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={updateAvailabilty}
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
                    // borderColor: colors.border,
                  }}>
                  <Regular label={item?.price_html} />
                  <Row style={{position: 'absolute', width: '100%', top: 0}}>
                    <Regular label={moment(item?.start).format('DD')} />
                    <Regular label={moment(item?.start).format('ddd')} />
                  </Row>
                </TouchableOpacity>
              );
            })}
          </Row>
        </KeyboardAvoidScrollview>
      )}
    </View>
  );
};
export default EditRoomAvailability;
