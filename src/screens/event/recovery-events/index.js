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
// import {EmptyList} from 'components/molecules/event/empty-list';
import {
  getRecoveryEvents,
  permnentlyDeleteEvent,
  recoverEvent,
} from 'services/api/event/api-actions';
import {UTILS} from 'utils';
import EventRecoveryCard from 'components/molecules/event/event-recovery-card';

const RecoveryEvents = props => {
  const [loading, setLoading] = React.useState(true);
  const [recoverLoading, setRecoverLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const {event} = useSelector(s => s);
  const [events, setEvents] = React.useState([]);
  // const {locations, event_filter, events} = event;

  const [page, setPage] = React.useState(1);
  const {t} = i18n;
  const getHomeEvents = async () => {
    try {
      setLoading(true);
      const res = await getRecoveryEvents();
      setEvents(res?.rows?.data || []);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  const getRecover = async event_id => {
    try {
      setRecoverLoading(true);
      const res = await recoverEvent(event_id);
      setEvents(pre => pre?.filter(x => x?.id !== event_id));
      // setEvents(res?.rows?.data || [])
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setRecoverLoading(false);
    }
  };
  const deleteEventPress = async event_id => {
    try {
      await permnentlyDeleteEvent(event_id);
      setEvents(events?.filter(x => x?.id !== event_id));
      Alert.alert('Delete event successfully');
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    }
  };
  React.useEffect(() => {
    getHomeEvents();
  }, []);

  const renderEventItem = ({item}) => (
    <EventRecoveryCard
      item={item}
      onPressDelete={() => deleteEventPress(item?.id)}
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
      {/* <ImageBackground source={IMG.Events_Bg} style={styles.bg}>
        <EventsHeader isSearch={true} back={true} />
      </ImageBackground> */}

      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={!loading && <EmptyList />}
            showsVerticalScrollIndicator={false}
            data={events || []}
            renderItem={renderEventItem}
            keyExtractor={(item, index) => index?.toString()}
            onEndReached={() => {
              if (!loading && !pageLoading && page < events?.last_page) {
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
        onPress={() => props?.navigation?.navigate('AddEvent')}
      /> */}
    </View>
  );
};
export default RecoveryEvents;
