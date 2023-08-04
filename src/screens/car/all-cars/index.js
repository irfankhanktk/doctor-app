import {PlusButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import CarCard from 'components/molecules/car/car-card';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getCars} from 'services/api/car/api-actions';
import {getLocations} from 'services/api/hotel/api-actions';
import i18n from 'translation';
import styles from './styles';
import {setCarForEdit} from 'store/reducers/car-reducer';
import {ADD_CAR_DEFAULT} from 'config/constants';
import {useIsFocused} from '@react-navigation/native';
import {navigate} from 'navigation/navigation-ref';
const AllCars = props => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();
  const {car, user, unreadNotification} = useSelector(s => s);
  const {car_filter, cars} = car;
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocus = useIsFocused();
  const {userInfo} = user;

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
  React.useEffect(() => {
    if (isFocus) dispatch(setCarForEdit({row: {...ADD_CAR_DEFAULT}}));
  }, [isFocus]);
  const renderCarItem = ({item}) => (
    <CarCard
      item={item}
      onPress={() =>
        props?.navigation?.navigate('CarDetails', {
          slug: item?.slug,
          id: item?.id,
        })
      }
      editPress={() => navigate('CarTopTab', {id: item?.id})}
    />
  );
  const renderFooter = () => {
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
        back={false}
        isCart={userInfo?.id}
        unreadNotification={unreadNotification}
        notification
        {...props}
      />

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
        onPress={() => props?.navigation?.navigate('CarTopTab')}
      />
    </View>
  );
};
export default AllCars;
