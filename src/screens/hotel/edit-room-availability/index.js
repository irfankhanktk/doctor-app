import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Loader} from 'components/atoms/loader';
import {t} from 'i18next';
import React from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';
import {
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
const EditRoomAvailability = props => {
  const {navigation, route} = props;
  const {hotel} = useSelector(s => s);
  const [loading, setLoading] = React.useState(true);
  const [updateLoading, setUpdateLoading] = React.useState(true);
  const [date, setDate] = React.useState(moment('2023-10-10').startOf('month'));
  const [availability, setAvailability] = React.useState([]);
  const getAvailabilty = async () => {
    try {
      setLoading(true);
      const res = await getRoomAvailability();
      console.log('res>>:::', res);
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
      const res = await updateRoomAvailability();
      console.log('res>>:::', res);
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
              onPress={() => setDate(pre => moment(pre)?.subtract(1, 'M'))}
            />
            <Row>
              <Regular label={date?.format('ll')} />
              {/* <Regular
                label={moment(new Date(2023, 6, 0)).add().format('ll')}
              /> */}
            </Row>
            <AntDesign
              name={'rightcircle'}
              onPress={() => setDate(pre => moment(pre)?.add(1, 'M'))}
            />
          </Row>
          <Row
            style={{
              flexWrap: 'wrap',
            }}>
            {availability?.map((item, index) => {
              console.log('item>>>', item);
              return (
                <View
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
                </View>
              );
            })}
          </Row>
        </KeyboardAvoidScrollview>
      )}
    </View>
  );
};
export default EditRoomAvailability;
