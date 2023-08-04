import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  I18nManager,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Medium from 'typography/medium-text';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {SearchInput} from '../inputs';
import {Row} from '../row';
import Regular from 'typography/regular-text';
import {navigate} from 'navigation/navigation-ref';
const HeaderX = ({
  style = {},
  title,
  back = false,
  onChangeText = t => {},
  isSearch = false,
  placeholder = 'Search here',
  unreadNotification,
  notification,
  onPress,
  ...props
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <Row style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          {back && (
            <View
              style={{
                backgroundColor: colors.white,
                padding: mvs(5),
                borderRadius: mvs(7),
              }}>
              <Icon
                name={I18nManager.isRTL ? 'right' : 'left'}
                size={mvs(20)}
                color={colors.black}
              />
            </View>
          )}
        </TouchableOpacity>
        <Medium fontSize={mvs(20)} label={title} style={[styles.title]} />

        {notification ? (
          <TouchableOpacity onPress={() => navigate('Notifications')}>
            <Ionicons
              name="notifications-sharp"
              size={mvs(25)}
              color={colors.white}
              style={{marginTop: mvs(5)}}
            />
            {unreadNotification ? (
              <View style={styles.notificationbadge}>
                <Regular
                  label={unreadNotification}
                  fontSize={mvs(10)}
                  style={{lineHeight: mvs(14), color: colors.white}}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </Row>
      {/* {isSearch && <SearchInput onChangeText={onChangeText} placeholder={placeholder} />} */}
    </View>
  );
};
export default React.memo(HeaderX);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(22),
    paddingVertical: mvs(15),
  },
  notificationbadge: {
    backgroundColor: colors.red,
    borderColor: colors.white,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: mvs(6),
    right: mvs(-3),
    alignItems: 'center',
    justifyContent: 'center',
    height: mvs(15),
    width: mvs(15),
    borderRadius: mvs(7.5),
  },
  empty: {
    width: mvs(10),
  },
  title: {
    fontSize: mvs(18),
    color: colors.white,
  },
  back: {},
});
