import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {EmptyList} from 'components/molecules/doctor/empty-list';

import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import React from 'react';
import {Alert, FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import i18n from 'translation';
import styles from './styles';
// import {EmptyList} from 'components/molecules/car/empty-list';
import {getRecoveryCars, recoverCar} from 'services/api/car/api-actions';
import {UTILS} from 'utils';
import CarRecoveryCard from 'components/molecules/car/car-recovery-card';

const RecoveryCars = props => {
  const [cartModal, setCardModal] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const [recoverLoading, setRecoverLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const {car} = useSelector(s => s);
  const [cars, setCars] = React.useState([]);
  // const {locations, car_filter, cars} = car;

  const [page, setPage] = React.useState(1);
  const {t} = i18n;
  const getHomeCars = async () => {
    try {
      setLoading(true);
      const res = await getRecoveryCars();
      setCars(res?.rows?.data || []);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  const getRecover = async car_id => {
    try {
      setRecoverLoading(true);
      const res = await recoverCar(car_id);
      setCars(pre => pre?.filter(x => x?.id !== car_id));
      // setCars(res?.rows?.data || [])
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setRecoverLoading(false);
    }
  };
  const deleteCarPress = async car_id => {
    try {
      await permnentlyDeletecar(car_id);
      setCars(cars?.filter(x => x?.id !== car_id));
      Alert.alert('Delete car successfully');
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    }
  };
  React.useEffect(() => {
    getHomeCars();
  }, []);

  const renderCarItem = ({item}) => (
    <CarRecoveryCard
      item={item}
      onPressDelete={() => deleteCarPress(item?.id)}
      recoverLoading={recoverLoading}
      onPressRecover={() => getRecover(item?.id)}
    />
  );
  const renderFooter = () => {
    // Render a loading indicator while more data is being fetched
    if (!loading && !pageLoading) return null;
    return (
      <View style={{paddingVertical: 70}}>
        <Loader />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header1x2x
        style={{height: mvs(70)}}
        isSearch={false}
        title={t('recovery')}
        back={true}
      />
      {/* <ImageBackground source={IMG.Cars_Bg} style={styles.bg}>
        <CarsHeader isSearch={true} back={true} />
      </ImageBackground> */}

      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={!loading && <EmptyList />}
            showsVerticalScrollIndicator={false}
            data={cars || []}
            renderItem={renderCarItem}
            keyExtractor={(item, index) => index?.toString()}
            onEndReached={() => {
              if (!loading && !pageLoading && page < cars?.last_page) {
                setPage(page + 1);
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
      {/* <PlusButton
        containerStyle={{bottom: mvs(70)}}
        onPress={() => props?.navigation?.navigate('AddCar')}
      /> */}
    </View>
  );
};
export default RecoveryCars;
