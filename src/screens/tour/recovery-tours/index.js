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
// import {EmptyList} from 'components/molecules/tour/empty-list';
import {
  getRecoveryTours,
  permnentlyDeleteTour,
  recoverTour,
} from 'services/api/tour/api-actions';
import {UTILS} from 'utils';
import TourRecoveryCard from 'components/molecules/tour/tour-recovery-card';

const RecoveryTours = props => {
  const [loading, setLoading] = React.useState(true);
  const [recoverLoading, setRecoverLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const {tour} = useSelector(s => s);
  const [tours, setTours] = React.useState([]);
  // const {locations, tour_filter, tours} = tour;

  const [page, setPage] = React.useState(1);
  const {t} = i18n;
  const getHomeTours = async () => {
    try {
      setLoading(true);
      const res = await getRecoveryTours();
      setTours(res?.rows?.data || []);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  const getRecover = async tour_id => {
    try {
      setRecoverLoading(true);
      const res = await recoverTour(tour_id);
      setTours(pre => pre?.filter(x => x?.id !== tour_id));
      // setTours(res?.rows?.data || [])
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setRecoverLoading(false);
    }
  };
  const deleteTourPress = async tour_id => {
    try {
      await permnentlyDeleteTour(tour_id);
      setTours(tours?.filter(x => x?.id !== tour_id));
      Alert.alert('Delete tour successfully');
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    }
  };
  React.useEffect(() => {
    getHomeTours();
  }, []);

  const renderTourItem = ({item}) => (
    <TourRecoveryCard
      item={item}
      onPressDelete={() => deleteTourPress(item?.id)}
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
      {/* <ImageBackground source={IMG.Tours_Bg} style={styles.bg}>
        <ToursHeader isSearch={true} back={true} />
      </ImageBackground> */}

      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={!loading && <EmptyList />}
            showsVerticalScrollIndicator={false}
            data={tours || []}
            renderItem={renderTourItem}
            keyExtractor={(item, index) => index?.toString()}
            onEndReached={() => {
              if (!loading && !pageLoading && page < tours?.last_page) {
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
        onPress={() => props?.navigation?.navigate('AddTour')}
      /> */}
    </View>
  );
};
export default RecoveryTours;
