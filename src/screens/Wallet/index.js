import { PrimaryButton } from 'components/atoms/buttons';

import { Loader } from 'components/atoms/loader';
import Header1x2x from 'components/atoms/walletheader/header-1x-2x';
import WalletAmount from 'components/molecules/modals/Wallet-amountmodal';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import moment from 'moment';
import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getWallet } from 'services/api/api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview/index';
import styles from './styles';

const WalletScreen = props => {
  const dispatch = useAppDispatch();
  const { userInfo, wallet } = useAppSelector(s => s.user);
  const { t } = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);

  React.useEffect(() => {
    getWalletHistory();
  }, []);

  const [value, setValue] = React.useState({});
  const initialValues = {
    amount: '',
    // password: '',
  };

  const [loading, setLoading] = React.useState(false);
  const [isSubmited, setIsSubmited] = React.useState(false);

  const getWalletHistory = async () => {
    try {
      dispatch(getWallet({ doctor_id: userInfo?.id }, setLoading));
    } catch (error) {
      console.log('error=>', error);
    }
  };
  const itemSeparatorComponent = () => {
    return <View style={{ paddingVertical: mvs(5) }}></View>;
  };
  const verifyOtp = () => {
    try {
    } catch (error) {
      console.log('error=>', error);
    }
  };
  useEffect(() => {
    getWalletHistory();
  }, [isSubmited]);
  return (
    <View style={styles.container}>
      <Header1x2x
        title={t('wallet')}
        wallettext={`SR ${loading ? '--' : wallet?.wallet?.balance ?? ''}`}
      />
      <View style={styles.walletcard}>
        <Feather name="shopping-bag" size={mvs(35)} color={'#000'} />
        <Medium
          label={`SR ${loading ? '--' : wallet?.wallet?.balance ?? ''}`}
          fontSize={mvs(20)}
          color={'#000'}
        />
        <PrimaryButton
          onPress={() => setOtpModalVisible(true)}
          containerStyle={{
            width: mvs(120),
            height: mvs(50),
            borderRadius: mvs(8),
          }}
          title={t('add_amount')}
        />
      </View>
      <View style={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          <View
            style={styles.contentContainerStyle}>
            <Medium
              label={t('history')}
              fontSize={mvs(20)}
              style={{ marginLeft: mvs(14) }}
            />
            <View style={{ padding: mvs(5) }}>
              <FlatList
                data={wallet?.tansactions}
                renderItem={({ item, index }) => (
                  <View key={index} style={styles.historycontainer}>
                    <View style={styles.cardcontainer}>
                      <MaterialIcons
                        name="payments"
                        size={mvs(40)}
                        color={colors.primary}
                        style={{ marginRight: mvs(15) }}
                      />
                      {/* <Regular label={item.city} color={colors.green} /> */}
                      <Regular
                        label={moment(item.created_at).format(
                          'DD/MM/YYYY HH:mm',
                        )}
                        color={colors.green}
                      />
                    </View>
                    <Regular
                      label={`SR ${item.amount}`}
                      color={colors.red}
                      style={{ marginHorizontal: mvs(10) }}
                    />
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: mvs(100) }}
                ItemSeparatorComponent={itemSeparatorComponent()}
              />
            </View>

            <WalletAmount
              onClose={() => setOtpModalVisible(false)}
              visible={otpModalVisible}
              setValue={setValue}
              value={value}
              userInfo={userInfo}
              isSubmited={() => {
                setIsSubmited(!isSubmited);
              }}
            />
            {/* <AntDesign
            onPress={() => setOtpModalVisible(true)}
            name="pluscircle"
            color={colors.primary}
            size={mvs(45)}
            style={{
              position: 'absolute',
              bottom: mvs(30),
              right: mvs(30),
              alignSelf: 'flex-end',
            }}
          /> */}
            {/* <PrimaryPhoneInput value={phone} onChangeText={setPhone} getCallingCode={(code) => { }} /> */}
          </View>
        )}
      </View>
    </View>
  );
};
export default WalletScreen;
