import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SplashIcon } from 'assets/doctor/icons';
import { splash_bg } from 'assets/doctor/images';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import i18n from 'translation';
import { STORAGEKEYS } from '../../config/constants';
import { getAllCategories } from '../../services/api/doctor/api-actions';
import { setLanguage, setLocation, setUserInfo } from '../../store/reducers/user-reducer';
import RootStackParamList from '../../types/navigation-types/root-stack';
import { UTILS } from 'utils';
import { useAppDispatch } from 'hooks/use-store';
import styles from './styles';
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
        let screen: any = 'HotelStack';
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
            screen = 'HotelStack';
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
