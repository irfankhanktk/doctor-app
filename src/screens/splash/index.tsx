import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SplashIcon } from 'assets/doctor/icons';
import { useAppDispatch } from 'hooks/use-store';
import React from 'react';
import { View } from 'react-native';
import { getNotifications, getUserInfo } from 'services/api/auth-api-actions';
import i18n from 'translation';
import { UTILS } from 'utils';
import { STORAGEKEYS } from '../../config/constants';
import {
  setLanguage,
  setLocation,
  setUserInfo,
} from '../../store/reducers/user-reducer';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const loadNotifications = async () => {
    try {
      dispatch(getNotifications());
    } catch (error) {
      console.log('error=>', error);
    }
  };
  React.useEffect(() => {
    (async () => {
      try {
        let screen: any = 'Login';
        UTILS.get_current_location(
          position => {
            dispatch(
              setLocation({
                latitude: position?.coords?.latitude,
                longitude: position?.coords?.longitude,
              }),
            );
          },
          error => { },
        );
        UTILS.getItem(STORAGEKEYS.lang).then((lang: any) => {
          i18n.changeLanguage(lang);
          dispatch(setLanguage(lang ?? 'en'));
        });

        UTILS.getItem(STORAGEKEYS.token).then(async (token: any) => {
          if (token) {
            try {
              const res = await getUserInfo();
              const role = res?.user?.role?.name;
              screen = `${role}Stack`;
              loadNotifications();
              dispatch(setUserInfo(res?.user));
            } catch (error) {
              console.log('error', error);
            }
          }
          setTimeout(() => {
            navigation?.replace(screen);
          }, 2000);
        });
      } catch (error) { }
    })();
  }, []);

  return (
    <View style={{ ...styles.container }}>
      <SplashIcon />
    </View>
  );
};
export default Splash;
