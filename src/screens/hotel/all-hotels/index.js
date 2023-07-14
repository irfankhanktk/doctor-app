import {PlusButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import HotelCard from 'components/molecules/hotel/hotel-card';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useSelector} from 'react-redux';
import i18n from 'translation';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import {ADD_HOTEL_DEFAULT} from 'config/constants';
import {getAllHotels} from 'services/api/hotel/api-actions';
import {setHotelForEdit} from 'store/reducers/hotel-reducer';

const AllHotels = props => {
  const isFocus = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [pageLoading, setPageLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const {hotel} = useSelector(s => s);
  const {hotels} = hotel;

  const [page, setPage] = React.useState(1);
  const {t} = i18n;
  const getHomeHotels = isReFreshing => {
    dispatch(getAllHotels(isReFreshing ? setRefreshing : setLoading));
  };

  React.useEffect(() => {
    getHomeHotels();
  }, []);
  React.useEffect(() => {
    if (isFocus) dispatch(setHotelForEdit({row: {...ADD_HOTEL_DEFAULT}}));
  }, [isFocus]);
  const renderHotelItem = ({item}) => (
    <HotelCard
      item={item}
      onPress={() =>
        props?.navigation?.navigate('HotelDetails', {
          hotel_id: item?.id,
          slug: item?.slug,
        })
      }
      // onPressEdit={() => navigate('AddHotel', { id: item?.id })}
    />
  );
  const renderFooter = () => {
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
        title={t('hotels')}
      />

      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => getHomeHotels(true)}
              />
            }
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={!loading && <EmptyList />}
            showsVerticalScrollIndicator={false}
            data={hotels || []}
            renderItem={renderHotelItem}
            keyExtractor={(item, index) => index?.toString()}
            onEndReached={() => {
              if (!loading && !pageLoading && page < hotels?.last_page) {
                setPage(page + 1);
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
      <PlusButton
        containerStyle={{bottom: mvs(70)}}
        onPress={() => props?.navigation?.navigate('HotelTopTab')}
      />
    </View>
  );
};
export default AllHotels;
