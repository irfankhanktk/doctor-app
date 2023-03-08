import {
  BottomTabScreenProps
} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { onLogoutPress } from 'services/api/api-actions';
import TabParamList from 'types/navigation-types/bottom-tab';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import i18n from '../../translation/index';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
type props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'UserTab'>,
  NativeStackScreenProps<RootStackParamList>
>;
const UserTab = (props: props) => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const { t } = i18n;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.img} />
        <Medium label={userInfo?.name || 'Guest Mode'} style={styles.name} />
        <Regular label={`${userInfo?.email || 'guest@gmail.com'}`} style={styles.email} />
        <View style={styles.linkContainer}>
          {userInfo && <TouchableOpacity style={styles.item} onPress={() => props?.navigation?.navigate('UpdatePassword')}>
            <Regular style={styles.itemText} label={`${t('update_password')}`} />
          </TouchableOpacity>}
          <TouchableOpacity style={styles.item} onPress={() => userInfo ? dispatch(onLogoutPress(props)) : props?.navigation?.navigate('Login')}>
            <Regular style={styles.itemText} label={`${t(userInfo ? 'logout' : 'login')}`} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => props?.navigation?.navigate('LanguageScreen')}>
            <Regular style={styles.itemText} label={`${t('choose_language')}`} />
          </TouchableOpacity>
          {userInfo && <TouchableOpacity style={styles.item} onPress={() => props?.navigation?.navigate('UpdateProfile')}>
            <Regular style={styles.itemText} label={`${t('update_profile')}`} />
          </TouchableOpacity>}
          {userInfo && <TouchableOpacity style={styles.item} onPress={() => props?.navigation?.navigate('AvailabilityList')}>
            <Regular style={styles.itemText} label={`${t('availabilities')}`} />
          </TouchableOpacity>}
        </View>
      </View>
    </View>
  );
};
export default UserTab;
