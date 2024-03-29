import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { InputWithIcon } from 'components/atoms/inputs';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview';
import { Loader } from 'components/atoms/loader';
import { Row } from 'components/atoms/row';

import CarAvailabilityModal from 'components/molecules/car/modals/availability-car-modal';
import { colors } from 'config/colors';
import { DATE_FORMAT } from 'config/constants';
import { mvs } from 'config/metrices';
import { t } from 'i18next';
import moment from 'moment';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import {
  getCarAvailability,
  updateCarAvailability,
} from 'services/api/car/api-actions';
import Regular from 'typography/regular-text';
import { UTILS } from 'utils';
import styles from './styles';

const EditCarAvailability = props => {
  const {car} = useSelector(s => s);
  const {cars} = car;
  const [loading, setLoading] = React.useState(true);
  const [date, setDate] = React.useState(moment().startOf('month'));
  const [availability, setAvailability] = React.useState([]);
  const [carId, setCarId] = React.useState();
  const [filterModal, setFilterModal] = React.useState(false);
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

      if (cars?.length) throw new Error('You have no car against car id');
      const res = await getCarAvailability(
        cars?.data[0]?.id,
        moment(date).format(DATE_FORMAT.yyyy_mm_dd),
        moment(date).endOf('month').format(DATE_FORMAT.yyyy_mm_dd),
      );
      setCarId(cars?.data[0]?.id);
      setAvailability(res || []);
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
        target_id: carId,
      };
      await updateCarAvailability(data);
      await getAvailabilty();
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAvailabilty();
  }, [date, carId]);
  return (
    <View style={styles.container1}>
      <Header1x2x title={t('car_availability')} back={true} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <InputWithIcon
          value={cars?.data?.find(x => x?.id == carId)?.title}
          onChangeText={setCarId}
          items={cars?.data}
          id={carId}
        />
        <Row>
          <AntDesign
            name={'leftcircle'}
            size={mvs(25)}
            onPress={() => setDate(pre => moment(pre)?.subtract(1, 'M'))}
          />
          <Row>
            <Regular label={date?.format('ll')} />
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
                    onPress={() => {
                      setFilterModal(true);
                      setFilterData({
                        start_date: moment(item?.start).format(
                          DATE_FORMAT.yyyy_mm_dd,
                        ),
                        end_date: moment(item?.end).format(
                          DATE_FORMAT.yyyy_mm_dd,
                        ),
                        number: `${item?.number}`,
                        price: `${item?.price}`,
                        active: `${item?.active}`,
                      });
                    }}
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
                       color={item?.active ? colors.white :colors.lightGray }
                    />
                    <Row style={{position: 'absolute', width: '100%', top: 0}}>
                      <Regular   color={item?.active ? colors.white :colors.lightGray }  label={moment(item?.start).format('DD')} />
                      <Regular   color={item?.active ? colors.white :colors.lightGray } label={moment(item?.start).format('ddd')} />
                    </Row>
                  </TouchableOpacity>
                );
              })}
            </>
          </Row>
        )}
        <CarAvailabilityModal
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
export default EditCarAvailability;
