import {PlusButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import CarCard from 'components/molecules/car/car-card';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import React from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {getCars} from 'services/api/car/api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {colors} from '../../../config/colors';
import styles from './styles';
import {getLocations} from 'services/api/hotel/api-actions';
const AllCars = props => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();
  const {car, user} = useSelector(s => s);
  const {car_filter, cars} = car;
  const [page, setPage] = React.useState(1);
  const [refreshing, setRefreshing] = React.useState(false);

  const {userInfo} = user;
  console.log('userInfo', userInfo);

  const {t} = i18n;
  const getHomeCars = bool => {
    dispatch(getCars(bool ? setRefreshing : setLoading));
  };
  React.useEffect(() => {
    getHomeCars();
  }, [car_filter]);
  React.useEffect(() => {
    dispatch(getLocations());
  }, []);
  const renderCarItem = ({item}) => (
    <CarCard
      item={item}
      onPress={() =>
        props?.navigation?.navigate('CarDetails', {
          slug: item?.slug,
          id: item?.id,
        })
      }
      onPressCart={() => {}}
    />
  );
  const renderFooter = () => {
    // Render a loading indicator while more data is being fetched
    if (!loading) return null;
    return (
      <View style={{paddingVertical: 70}}>
        <Loader />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header1x2x
        style={{height: mvs(60)}}
        isSearch={false}
        title={t('cars')}
        back={true}
        isCart={userInfo?.id}
        {...props}
      />
      <Row
        style={{
          alignItems: 'center',
          marginHorizontal: mvs(20),
          marginTop: mvs(15),
        }}>
        <Medium label={t('all_cars')} fontSize={mvs(20)} />
        <TouchableOpacity
          onPress={() => props?.navigation?.navigate('CarFilterScreen')}>
          <Row>
            <Regular label={t('car_filter')} />
            <Ionicons
              size={mvs(20)}
              name={'filter'}
              color={colors.primary}
              style={{marginLeft: mvs(5)}}
            />
          </Row>
          {/* <Medium label={'Filter'} fontSize={mvs(20)} style={{ marginHorizontal: mvs(20), marginTop: mvs(15), }} /> */}
        </TouchableOpacity>
      </Row>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => getHomeCars(true)}
              />
            }
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={!loading && <EmptyList />}
            showsVerticalScrollIndicator={false}
            data={cars?.data || []}
            renderItem={renderCarItem}
            keyExtractor={(item, index) => index?.toString()}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
      <PlusButton
        containerStyle={{bottom: mvs(60)}}
        onPress={() => props?.navigation?.navigate('AddCar')}
      />
    </View>
  );
};
export default AllCars;
