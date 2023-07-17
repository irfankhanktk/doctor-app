import {PlusButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import EventCard from 'components/molecules/event/event-card';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import React from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {getEvents} from 'services/api/event/api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {colors} from '../../../config/colors';
import styles from './styles';
import {getLocations} from 'services/api/hotel/api-actions';
const AllEvents = props => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();
  const {event, user} = useSelector(s => s);
  const {event_filter, events} = event;
  const [page, setPage] = React.useState(1);
  const [refreshing, setRefreshing] = React.useState(false);

  const {userInfo} = user;

  const {t} = i18n;
  const getHomeEvents = bool => {
    dispatch(getEvents(bool ? setRefreshing : setLoading));
  };
  React.useEffect(() => {
    getHomeEvents();
  }, [event_filter]);
  React.useEffect(() => {
    dispatch(getLocations());
  }, []);
  const renderEventItem = ({item}) => (
    <EventCard
      item={item}
      onPress={() =>
        props?.navigation?.navigate('EventDetails', {
          slug: item?.slug,
          id: item?.id,
        })
      }
      onPressEventt={() => {}}
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
        title={t('events')}
        back={false}
        isEventt={userInfo?.id}
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
                onRefresh={() => getHomeEvents(true)}
              />
            }
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={!loading && <EmptyList />}
            showsVerticalScrollIndicator={false}
            data={events?.data || []}
            renderItem={renderEventItem}
            keyExtractor={(item, index) => index?.toString()}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
      <PlusButton
        containerStyle={{bottom: mvs(60)}}
        onPress={() => props?.navigation?.navigate('AddEvent')}
      />
    </View>
  );
};
export default AllEvents;
