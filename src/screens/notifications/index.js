import * as IMG from 'assets/doctor/images';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import moment from 'moment';
import React, {useEffect} from 'react';
import {FlatList, Image, View} from 'react-native';
import {onReadNotifications} from 'services/api/doctor/api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';

const Notifications = props => {
  const dispatch = useAppDispatch();
  const {userInfo, notifications} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);

  // const loadNotifications = async () => {
  //   try {
  //     dispatch(getNotifications({ doctor_id: userInfo?.id }, setLoading, readNotifications));
  //   } catch (error) {
  //     console.log('error=>', error);
  //   }
  // };
  const readNotifications = async () => {
    try {
      const unreadNoti = notifications
        ?.filter(x => !x?.is_read)
        ?.map(x => x?.id);
      if (!unreadNoti?.length) return;
      await onReadNotifications({
        doctor_id: userInfo?.id,
        ids: unreadNoti,
      });
    } catch (error) {
      console.log('error=>', error);
    }
  };

  useEffect(() => {
    readNotifications();
  }, []);
  const renderAppointmentItem = ({item, index}) => (
    <View
      key={index}
      style={[
        styles.rendercontainer,
        {backgroundColor: item?.is_read ? colors.white : colors?.blueHalf},
      ]}>
      <Row style={{justifyContent: 'flex-start'}}>
        <Image
          source={IMG.notificationcardicon}
          style={styles.notificationicon}
        />
        <View style={styles.titleandtextview}>
          <Row>
            <Medium label={item.title} />
          </Row>
          <Regular label={item.text} numberOfLines={3} />
        </View>
      </Row>
      <Regular
        label={moment(item.created_at).format('DD MMM, YYYY  hh:mm a')}
        style={{alignSelf: 'flex-end'}}
        fontSize={mvs(12)}
        color={colors.primary}
      />
    </View>
  );
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={t('notifications')} />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          ListEmptyComponent={<EmptyList label={t('no_notification')} />}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={notifications}
          renderItem={renderAppointmentItem}
          ItemSeparatorComponent={itemSeparatorComponent()}
          keyExtractor={(_, index) => index?.toString()}
        />
      )}
    </View>
  );
};
export default Notifications;
