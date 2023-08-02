import {Loader} from 'components/atoms/loader';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {goBack} from 'navigation/navigation-ref';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {
  getPaymentTransationStatus,
  getPaymentUri,
} from 'services/api/auth-api-actions';
import {setTransactionId} from 'store/reducers/user-reducer';
import {UTILS} from 'utils';

const PaymentGatewayScreen = props => {
  const {amount} = props?.route?.params;
  const [paymentStatus, setPaymentStatus] = React.useState('');
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();
  const {transaction_id} = useAppSelector(s => s?.user);
  const handleWebViewNavigationStateChange = async newNavState => {
    // You can handle any custom logic based on the URL here
    // For example, checking if the payment was successful or not
    const {url} = newNavState;
    const searchString = '/start';
    console.log('url:::>>>>>', url);
    if (url === 'https://bookme.com.sa/') {
      if (transaction_id) return;
      // Payment was successful
      try {
        const payload = {
          profile_id: 43265,
          tran_ref: data?.tran_ref,
        };
        console.log(':getPaymentTransationStatus:::');
        const res = await getPaymentTransationStatus(payload);
        console.log('res:::getPaymentTransationStatus:::', res?.data);
        if (res?.data?.payment_result?.response_status === 'A') {
          dispatch(setTransactionId(data?.tran_ref));
          Alert.alert(
            'Transaction Successfull',
            'Your transaction is processed successfully',
          );
          goBack();
          return;
        } else {
          throw new Error(res?.data?.payment_result?.response_message);
        }
      } catch (error) {
        Alert.alert('Payment Error', UTILS?.returnError(error));
      }
    } else if (url.indexOf(searchString) !== -1) {
      // Payment started
      console.log('Payment started');
    } else {
      // Alert.alert('Payment Error', 'Something went wrong!');
    }
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = {
          profile_id: 43265,
          tran_type: 'auth',
          tran_class: 'ecom',
          cart_description: 'Description of the items/services',
          cart_id: '938u4983u923',
          cart_currency: 'SAR',
          cart_amount: amount,
          callback: 'https://bookme.com.sa/',
          return: 'https://bookme.com.sa/',
          // callback: 'https://yourdomain.com/yourcallback',
          // return: 'https://yourdomain.com/yourpage',
        };
        const res = await getPaymentUri(data);
        console.log('res:::>>>', res?.data);
        setData(res?.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onMessage = event => {
    // Parse the message received from the WebView
    const data = JSON.parse(event.nativeEvent.data);
    console.log('data:::::::', data);
    console.log('status:::::::', data.paymentStatus);
    // Handle payment status sent from the WebView
    if (data.paymentStatus) {
      setPaymentStatus(data.paymentStatus);
      // You can perform actions based on the payment status here
      // For example, navigate to a success/failure screen
    }
  };
  const handleWebViewError = syntheticEvent => {
    // setError(true);
    // setLoading(false);
    console.error('WebView Error:>>>>>>>> ', syntheticEvent.nativeEvent);
  };
  if (loading) return <Loader />;
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: data?.redirect_url}}
        onMessage={onMessage}
        javaScriptEnabled={true}
        onError={handleWebViewError}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    </View>
  );
};

export default PaymentGatewayScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
