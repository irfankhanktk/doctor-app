import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import Config from 'react-native-config';
import { STORAGEKEYS } from '../../config/constants';
import RootStackParamList from '../../types/navigation-types/root-stack';
import Regular from '../../typography/regular-text';
import { UTILS } from '../../utils';
import { useAppDispatch, useAppSelector } from './../../hooks/use-store';
import styles from './styles';
import { setLanguage, setLocation, setUserInfo } from '../../store/reducers/user-reducer';
import i18n from 'translation';
import { SplashIcon } from 'assets/icons';
import { splash_bg } from 'assets/images';
import { getAllHospitals } from 'services/api/api-actions';
import { getAllCategories } from '../../services/api/api-actions';
type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, [])
  React.useEffect(() => {

    (async () => {
      try {
        let screen: 'Login' | 'BottomTab' = 'Login';
        UTILS.get_current_location((position) => {
          dispatch(setLocation({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude
          }))

        }, (error) => {

        })
        UTILS.getItem(STORAGEKEYS.lang).then((lang: any) => {
          i18n.changeLanguage(lang);
          dispatch(setLanguage(lang ?? 'en'));
        })

        UTILS.getItem(STORAGEKEYS.user).then((data: any) => {
          if (data) {
            const user = JSON.parse(data);
            screen = 'BottomTab';
            dispatch(setUserInfo(user));
          }
          setTimeout(() => {
            navigation?.replace(screen);
          }, 2000);
        });

      } catch (error) {

      }
    })()
  }, []);


  return (
    <View style={{ ...styles.container }}>
      <ImageBackground source={splash_bg} style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <SplashIcon />
      </ImageBackground>
    </View>
  );
};
export default Splash;
