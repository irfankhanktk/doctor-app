import {PlusButton} from 'components/atoms/buttons';
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
// import {EmptyList} from 'components/molecules/hotel/empty-list';
import {
  getRecoveryHotels,
  permnentlyDeleteHotel,
  recoverHotel,
} from 'services/api/hotel/api-actions';
import {UTILS} from 'utils';
import HotelRecoveryCard from 'components/molecules/hotel/hotel-recovery-card';

const RecoveryHotels = props => {
  const [cartModal, setCardModal] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const [recoverLoading, setRecoverLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const {hotel} = useSelector(s => s);
  const [hotels, setHotels] = React.useState([]);
  // const {locations, hotel_filter, hotels} = hotel;

  const [page, setPage] = React.useState(1);
  const {t} = i18n;
  const getHomeHotels = async () => {
    try {
      setLoading(true);
      const res = await getRecoveryHotels();
      setHotels(res?.rows?.data || []);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  const getRecover = async hotel_id => {
    try {
      setRecoverLoading(true);
      const res = await recoverHotel(hotel_id);
      setHotels(pre => pre?.filter(x => x?.id !== hotel_id));
      // setHotels(res?.rows?.data || [])
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setRecoverLoading(false);
    }
  };
  const deleteHotelPress = async hotel_id => {
    try {
      await permnentlyDeleteHotel(hotel_id);
      setHotels(hotels?.filter(x => x?.id !== hotel_id));
      Alert.alert('Delete hotel successfully');
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    }
  };
  React.useEffect(() => {
    getHomeHotels();
  }, []);

  const renderHotelItem = ({item}) => (
    <HotelRecoveryCard
      item={item}
      onPressDelete={() => deleteHotelPress(item?.id)}
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
        title={t('hotels')}
        back={true}
      />
      {/* <ImageBackground source={IMG.Hotels_Bg} style={styles.bg}>
        <HotelsHeader isSearch={true} back={true} />
      </ImageBackground> */}

      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <FlatList
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
      {/* <PlusButton
        containerStyle={{bottom: mvs(70)}}
        onPress={() => props?.navigation?.navigate('AddHotel')}
      /> */}
    </View>
  );
};
export default RecoveryHotels;
