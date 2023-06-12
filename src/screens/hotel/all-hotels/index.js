import {PlusButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import HotelCard from 'components/molecules/hotel/hotel-card';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {colors} from 'config/colors';
import styles from './styles';
import {EmptyList} from 'components/molecules/doctor/empty-list';
// import {EmptyList} from 'components/molecules/hotel/empty-list';
import {getAllHotels} from 'services/api/hotel/api-actions';

const AllHotels = props => {
  const [cartModal, setCardModal] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const {hotel} = useSelector(s => s);
  const {hotels} = hotel;
  // const {locations, hotel_filter, hotels} = hotel;
  const [filterModal, setFilterModal] = React.useState(false);
  const [allHotels, setAllHotels] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const {t} = i18n;
  const getHomeHotels = () => {
    dispatch(getAllHotels());
  };
  React.useEffect(() => {
    getHomeHotels();
  }, []);

  const renderHotelItem = ({item}) => (
    <HotelCard
      item={item}
      onPress={() =>
        props?.navigation?.navigate('HotelDetails', {
          hotel_id: item?.id,
        })
      }
      onPressCart={() => setCardModal(true)}
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
      <PlusButton
        containerStyle={{bottom: mvs(70)}}
        onPress={() => props?.navigation?.navigate('AddHotel')}
      />
    </View>
  );
};
export default AllHotels;
