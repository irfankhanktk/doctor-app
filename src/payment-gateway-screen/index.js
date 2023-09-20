import {Loader} from 'components/atoms/loader';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {goBack} from 'navigation/navigation-ref';
import React, {useEffect} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {
  getPaymentTransationStatus,
  getPaymentUri,
  onAddAmount,
} from 'services/api/auth-api-actions';
import {UTILS} from 'utils';
import {colors} from 'config/colors';
import {IP, URLS} from 'services/api/api-urls';
import Medium from 'typography/medium-text';
import {mvs} from 'config/metrices';

const PaymentGatewayScreen = props => {
  const {amount} = props?.route?.params;
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [proceedLoading, setProceedLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  let isRedirected = false;
  const {transaction_id} = useAppSelector(s => s?.user);

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
          callback: `${IP}/`,
          return: `${URLS.redirect_url}`,
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

  const onMessage = async resdata => {
    // Parse the message received from the WebView
    console.log('data.nativeEvent.url', resdata.nativeEvent.url);
    const url = resdata.nativeEvent.url;
    const searchString = '/start';
    if (url === `${IP}/`) {
      // if (isRedirected) return;
      // Payment was successful
      try {
        isRedirected = true;
        const payload = {
          profile_id: 43265,
          tran_ref: data?.tran_ref,
        };
        setProceedLoading(true);
        const res = await getPaymentTransationStatus(payload);
        if (res?.data?.payment_result?.response_status === 'A') {
          console.log('trans_id::', data?.tran_ref);
          await onAddAmount({
            transaction_id: data?.tran_ref,
          });
          // dispatch(setTransactionId(data?.tran_ref));
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
      } finally {
        setProceedLoading(false);
      }
    } else if (url.indexOf(searchString) !== -1) {
      // Payment started
      console.log('Payment started');
    } else {
      // Alert.alert('Payment Error', 'Something went wrong!');
    }
  };
  const handleWebViewError = syntheticEvent => {
    // setError(true);
    // setLoading(false);
    console.error('WebView Error:>>>>>>>> ', syntheticEvent.nativeEvent);
  };
  const injectedJs = `window.ReactNativeWebView.postMessage(JSON.stringify(window.location.search));`;
  if (loading) return <Loader />;
  return (
    <View style={{flex: 1}}>
      {proceedLoading && (
        <Medium
          style={{
            alignSelf: 'center',
            color: colors.primary,
            fontSize: mvs(20),
          }}
          label={'Wait your payment is proceeding'}
        />
      )}
      <WebView
        source={{uri: data?.redirect_url}}
        onMessage={onMessage}
        onError={handleWebViewError}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        // onNavigationStateChange={handleWebViewNavigationStateChange}
        useWebKit
        injectedJavaScript={injectedJs}
        scalesPageToFit={true}
        javaScriptEnabledAndroid={true}
        javaScriptEnabled={true}
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
