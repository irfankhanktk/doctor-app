import {PrimaryButton} from 'components/atoms/buttons';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from 'components/atoms/loader';
import Header1x2x from 'components/atoms/walletheader/header-1x-2x';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import WalletAmount from 'components/molecules/doctor/modals/Wallet-amountmodal';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import moment from 'moment';
import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getWallet} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {setTransactionId} from 'store/reducers/user-reducer';
import {CURRENCY} from 'config/constants';

const WalletScreen = props => {
  const dispatch = useAppDispatch();
  const {userInfo, wallet, transaction_id} = useAppSelector(s => s.user);
  const isFocus = useIsFocused();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);

  React.useEffect(() => {
    getWalletHistory();
  }, []);

  const [value, setValue] = React.useState('');
  const initialValues = {
    amount: '',
    // password: '',
  };

  const [loading, setLoading] = React.useState(false);
  const [isSubmited, setIsSubmited] = React.useState(false);

  const getWalletHistory = async () => {
    try {
      dispatch(getWallet({user_id: userInfo?.id}, setLoading));
    } catch (error) {
      console.log('error=>', error);
    }
  };
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  const verifyOtp = () => {
    try {
    } catch (error) {
      console.log('error=>', error);
    }
  };
  useEffect(() => {
    if (isFocus) getWalletHistory();
  }, [isSubmited, isFocus]);
  return (
    <View style={styles.container}>
      <Header1x2x
        title={t('wallet')}
        wallettext={`${CURRENCY} ${
          loading ? '--' : wallet?.wallet?.balance ?? '--'
        }`}
      />
      <View style={styles.walletcard}>
        <Feather name="shopping-bag" size={mvs(35)} color={'#000'} />
        <Medium
          label={`${CURRENCY} ${
            loading ? '--' : wallet?.wallet?.balance ?? '--'
          }`}
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
          <View style={styles.contentContainerStyle}>
            <Medium
              label={t('history')}
              fontSize={mvs(20)}
              style={{marginLeft: mvs(14)}}
            />

            <FlatList
              data={wallet?.tansactions}
              ListEmptyComponent={<EmptyList label={t('history_content')} />}
              renderItem={({item, index}) => (
                <View key={index} style={styles.historycontainer}>
                  <View style={styles.cardcontainer}>
                    <MaterialIcons
                      name="payments"
                      size={mvs(40)}
                      color={colors.primary}
                      style={{marginRight: mvs(15)}}
                    />
                    {/* <Regular label={item.city} color={colors.green} /> */}
                    <Regular
                      label={moment(item.created_at).format('DD/MM/YYYY HH:mm')}
                      color={colors.green}
                    />
                  </View>
                  <Regular
                    label={`SR ${item.amount}`}
                    color={
                      item?.type == 'deposit' ? colors.primary : colors.red
                    }
                    style={{marginHorizontal: mvs(10)}}
                  />
                </View>
              )}
              contentContainerStyle={{paddingBottom: mvs(100), flexGrow: 1}}
              ItemSeparatorComponent={itemSeparatorComponent()}
            />

            <WalletAmount
              onClose={() => setOtpModalVisible(false)}
              visible={otpModalVisible}
              setValue={setValue}
              value={value}
              userInfo={{...userInfo}}
              isSubmited={() => {
                setIsSubmited(!isSubmited);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};
export default WalletScreen;
