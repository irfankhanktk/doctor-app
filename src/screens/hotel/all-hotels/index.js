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
// import {getHotels, getLocations} from 'services/api/hotel-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {colors} from 'config/colors';
import styles from './styles';
import {EmptyList} from 'components/molecules/doctor/empty-list';
// import {EmptyList} from 'components/molecules/hotel/empty-list';

const AllHotels = props => {
  const [cartModal, setCardModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  // const dispatch = useAppDispatch();
  // const {hotel} = useSelector(s => s);
  // const {locations, hotel_filter, hotels} = hotel;
  const [filterModal, setFilterModal] = React.useState(false);
  const [allHotels, setAllHotels] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hotels, setHotels] = React.useState([{id: 1}]);
  const {t} = i18n;
  const getHomeHotels = bool => {
    if (bool) {
    }
    // dispatch();
    // getHotels(page > 1 ? setPageLoading : setLoading, bool ? 1 : page),
  };
  React.useEffect(() => {
    // getHomeHotels(true);
    // }, [hotel_filter]);
  }, []);

  const renderHotelItem = ({item}) => (
    <HotelCard
      item={item}
      onPress={() =>
        props?.navigation?.navigate('HotelDetails', {
          slug: item?.slug,
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
        style={{height: mvs(60)}}
        isSearch={false}
        title={t('hotels')}
        back={true}
      />
      {/* <ImageBackground source={IMG.Hotels_Bg} style={styles.bg}>
        <HotelsHeader isSearch={true} back={true} />
      </ImageBackground> */}
      <Row
        style={{
          alignItems: 'center',
          marginHorizontal: mvs(20),
          marginTop: mvs(15),
        }}>
        <Medium label={t('all_hotels')} fontSize={mvs(20)} />
        <TouchableOpacity onPress={() => props?.navigation?.navigate('Hotels')}>
          <Row>
            <Regular label={t('hotel_filter')} />
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
            contentContainerStyle={styles.contentContainerStyle}
            // ListEmptyComponent={!loading && <EmptyList />}
            showsVerticalScrollIndicator={false}
            data={hotels}
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
      <PlusButton onPress={() => props?.navigation?.navigate('AddHotel')} />
    </View>
  );
};
export default AllHotels;
