import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import AppointmentCard from 'components/molecules/appointment-card';
import {EmptyList} from 'components/molecules/empty-list';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React, {useEffect} from 'react';
import {FlatList, View, Img, TouchableOpacity, Image} from 'react-native';
import {getAppointmentsList, getNotifications} from 'services/api/api-actions';
import i18n from 'translation';
import styles from './styles';
import * as IMG from 'assets/images';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import Bold from 'typography/bold-text';
import {Row} from 'components/atoms/row';
import moment from 'moment';

const Notifications = props => {
  const dispatch = useAppDispatch();
  const {userInfo, notifications} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(true);
  const [arrayFormat, setArrayFormat] = React.useState([]);
  const [appointments, setAppointments] = React.useState([
    {
      id: '1',
      title: 'New Notifications',
      time: '24 dec, 2023',
      description:
        'Lorem ipmsoum jfdghsjkfb asjhfjk Lorem ipmsoum jfdghsjkfb asjhfjk Lorem ipmsoum jfdghsjkfb asjhfjk  ',
      icon: IMG.notificationcardicon,
    },
    {
      id: '2',
      title: 'New Notifications',
      time: '24 dec, 2023',
      description: 'Lorem ipmsoum jfdghsjkfb asjhfjk ',
      icon: IMG.notificationcardicon,
    },
    {
      id: '3',
      title: 'New Notifications',
      time: '24 dec, 2023',
      description: 'Lorem ipmsoum jfdghsjkfb asjhfjk ',
      icon: IMG.notificationcardicon,
    },
  ]);
  const loadNotifications = async () => {
    try {
      dispatch(getNotifications({doctor_id: userInfo?.id}, setLoading));
    } catch (error) {
      console.log('error=>', error);
    }
  };
  useEffect(() => {
    loadNotifications();
  }, []);
  // const {userInfo} = useAppSelector(s => s?.user);
  // React.useEffect(() => {
  //   (async () => {
  //     const formDate = '';
  //     const res = await getAppointmentsList(userInfo?.id, formDate, setLoading);
  //     setAppointments(res?.listOfAppointments || []);
  //     setArrayFormat(res?.arrayFormat || []);
  //   })();
  // }, []);
  const renderAppointmentItem = ({item, index}) => (
    // <AppointmentCard
    //   onPress={() =>
    //     props?.navigation?.navigate('AppointmentDetails', {
    //       id: item?.id,
    //     })
    //   }
    //   item={item}
    //   slotTime={`${arrayFormat[item?.start_time_id]} - ${
    //     arrayFormat[item?.end_time_id]
    //   }`}
    // />
    <View key={index} style={styles.rendercontainer}>
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
      <Header1x2x title={t('notifications')} />
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
          // keyExtractor={(item, index) => index?.toString()}
        />
      )}
    </View>
  );
};
export default Notifications;
