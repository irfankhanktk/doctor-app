import {PlusButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import TourCard from 'components/molecules/tour/tour-card';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getLocations} from 'services/api/hotel/api-actions';
import {getTours} from 'services/api/tour/api-actions';
import i18n from 'translation';
import styles from './styles';
const AllTours = props => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();
  const {tour, user} = useSelector(s => s);
  const {tour_filter, tours} = tour;
  const [page, setPage] = React.useState(1);
  const [refreshing, setRefreshing] = React.useState(false);

  const {userInfo} = user;

  const {t} = i18n;
  const getHomeTours = bool => {
    dispatch(getTours(bool ? setRefreshing : setLoading));
  };
  React.useEffect(() => {
    getHomeTours();
  }, [tour_filter]);
  React.useEffect(() => {
    dispatch(getLocations());
  }, []);
  const renderTourItem = ({item}) => (
    <TourCard
      item={item}
      onPress={() =>
        props?.navigation?.navigate('TourDetails', {
          slug: item?.slug,
          id: item?.id,
        })
      }
      onPressEvent={() => {}}
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
        title={t('tours')}
        back={false}
        isTourt={userInfo?.id}
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
                onRefresh={() => getHomeTours(true)}
              />
            }
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={!loading && <EmptyList />}
            showsVerticalScrollIndicator={false}
            data={tours?.data || []}
            renderItem={renderTourItem}
            keyExtractor={(item, index) => index?.toString()}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
      <PlusButton
        containerStyle={{bottom: mvs(60)}}
        onPress={() => props?.navigation?.navigate('AddTour')}
      />
    </View>
  );
};
export default AllTours;
