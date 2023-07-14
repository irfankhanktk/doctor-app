import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { TouchableOpacity, View ,ImageBackground,Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { onLogoutPress, onUpdateProfile } from 'services/api/auth-api-actions';
import TabParamList from 'types/navigation-types/bottom-tab';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import i18n from '../../translation/index';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import { navigate } from 'navigation/navigation-ref';
import { Loader } from 'components/atoms/loader';
import { UTILS } from 'utils';
import { Alert } from 'react-native';
import { postFileData } from 'services/api/hotel/api-actions';
import { login_bg } from 'assets/doctor/images';
type props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'UserTab'>,
  NativeStackScreenProps<RootStackParamList>
>;
const UserTab = (props: props) => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  console.log('user info===>',userInfo);
  
  const dispatch = useAppDispatch();
  const { t } = i18n;
  const [imagegallery, setImageGallery] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const ImageUpload = async () => {
    try {
      const img = await UTILS._returnImageGallery();
      const file = await postFileData({file: img, type: 'image'});
      const data = {...userInfo};
      delete data.roles;
      delete data.role;
      dispatch(
        onUpdateProfile(
          {...data, avatar_id: file?.data?.data?.id},
          setLoading,
          props,
        ),
      );
      console.log('file', file?.data);
      console.log('image', img);
    } catch (error) {
      Alert.alert('Error', UTILS?.returnError(error));
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
      <View style={{...styles.img}}>
          {loading ? (
            <Loader color={colors.white} />
          ) : (
            <Image
              source={
                userInfo?.avatar_id ? {uri: `${userInfo?.avatar_id}`} : login_bg
              }
              style={styles.imgUpload}
              resizeMode="contain"
            />
          )}
          {userInfo?.id && (
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: mvs(10),
                position: 'absolute',
                right: mvs(-10),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => ImageUpload()}>
              <MaterialIcons name="edit" color={colors.black} size={mvs(20)} />
            </TouchableOpacity>
          )}
        </View>
        <Medium
          label={userInfo?.name || t('guest_mode')}
          style={styles.name}
        />
        <Regular
          label={`${userInfo?.email || 'guest@gmail.com'}`}
          style={styles.email}
        />

        <View style={styles.linkContainer}>
          {userInfo && (
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('UpdatePassword')}>
              <FontAwesome name="key" size={mvs(22)} color={colors.primary} />
              <Regular
                style={styles.itemText1}
                label={`${t('update_password')}`}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.itemtabs}
            onPress={() => props?.navigation?.navigate('LanguageScreen')}>
            <FontAwesome5 name="globe" size={mvs(22)} color={colors.primary} />
            <Regular
              style={styles.itemText1}
              label={`${t('choose_language')}`}
            />
          </TouchableOpacity>
          {userInfo && (
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => navigate('UpdateProfile')}>
              <FontAwesome5
                name="user-edit"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular
                style={styles.itemText1}
                label={`${t('update_profile')}`}
              />
            </TouchableOpacity>
          )}
          {/* {userInfo && (
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => props?.navigation?.navigate('AvailabilityList')}>
              <Ionicons
                name="timer-outline"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular
                style={styles.itemText1}
                label={`${t('availabilities')}`}
              />
            </TouchableOpacity>
          )} */}
          {userInfo && (
            <TouchableOpacity
              style={styles.itemtabs}
              onPress={() => navigate('Recovery')}>
              <Ionicons
                name="timer-outline"
                size={mvs(22)}
                color={colors.primary}
              />
              <Regular
                style={styles.itemText1}
                label={`${t('recovery')}`}
              />
            </TouchableOpacity>
          )}
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',

              width: '100%',
              paddingBottom: mvs(60),
            }}>
            <TouchableOpacity
              style={styles.logouttab}
              onPress={() =>
                userInfo
                  ? dispatch(onLogoutPress(props))
                  : props?.navigation?.navigate('Login')
              }>
              <AntDesign
                name={`${userInfo ? 'logout' : 'login'}`}
                size={mvs(22)}
                color={colors.red}
              />
              <Regular
                style={styles.itemText1}
                label={`${t(userInfo ? 'logout' : 'login')}`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default UserTab;
