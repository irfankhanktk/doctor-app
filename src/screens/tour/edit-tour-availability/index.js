import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {InputWithIcon} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';

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
  getTourAvailability,
  updateTourAvailability,
} from 'services/api/tour/api-actions';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import styles from './styles';
import TourAvailabilityModal from 'components/molecules/tour/modals/availability-tour-modal';

const EditTourAvailability = props => {
  const {navigation, route} = props;

  const {tour} = useSelector(s => s);
  const {tours} = tour;
  const [loading, setLoading] = React.useState(true);
  const [updateLoading, setUpdateLoading] = React.useState(true);
  const [date, setDate] = React.useState(moment('2023-10-10').startOf('month'));
  const [availability, setAvailability] = React.useState([]);
  const [tourId, setTourId] = React.useState();
  console.log('state tourid ===?', tourId);
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

      if (tours?.length) throw new Error('You have no tour against tour id');
      const res = await getTourAvailability(
        tours?.data[0]?.id,
        moment(date).format(DATE_FORMAT.yyyy_mm_dd),
        moment(date).endOf('month').format(DATE_FORMAT.yyyy_mm_dd),
      );
      setTourId(tours?.data[0]?.id);
      setAvailability(res || []);
      console.log('res me check=====>', res);
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
        tour: `$${filterData?.price}`,
        start_date: filterData?.start_date,
        end_date: filterData?.end_date,
        target_id: tourId,
      };

      const res = await updateTourAvailability(data);

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
  }, [date, tourId]);
  return (
    <View style={styles.container1}>
      <Header1x2x title={t('tour_availability')} back={true} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <InputWithIcon
          value={tours?.data?.find(x => x?.id == tourId)?.title}
          onChangeText={setTourId}
          items={tours?.data}
          id={tourId}
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
                      label={item?.active ? `$${item?.price}` : item?.title}
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
        <TourAvailabilityModal
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
export default EditTourAvailability;
