import {CrossModal} from 'assets/doctor/icons';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import WebView from 'react-native-webview';
import i18n from 'translation';
const InvoiceModal = ({
  style,
  visible = false,
  bookingItem,
  onClose = item => {},
}) => {
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);

  const bearerToken = bookingItem?.bearerToken;

  const webViewHeaders = {
    Authorization: `Bearer ${bearerToken}`,
  };

  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      <View style={styles.container}>
        <View style={styles.header} />
        <TouchableOpacity onPress={() => onClose()} style={styles.cross}>
          <CrossModal height={mvs(30)} width={mvs(30)} />
        </TouchableOpacity>
        <View style={{flex: 1, marginTop: mvs(15)}}>
          <WebView
            source={{
              uri: `https://bookme.com.sa/user/booking/${bookingItem?.code}/invoice`,
            }}
            startInLoadingState
            javaScriptEnabled
            domStorageEnabled
            sharedCookiesEnabled
            thirdPartyCookiesEnabled
            headers={webViewHeaders}
          />
        </View>
      </View>
    </ModalWrapper>
  );
};
export default InvoiceModal;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: mvs(20),
  },
  container: {
    flex: 1,
    marginVertical: mvs(30),
    backgroundColor: colors.white,
    paddingVertical: mvs(15),
    borderRadius: mvs(10),
  },
  buttonContiner: {
    height: mvs(40),
    borderRadius: mvs(5),
  },
  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  remainInputContainer: {
    borderWidth: mvs(1),
    width: mvs(140),
    height: mvs(40),
  },
  cross: {
    padding: mvs(20),
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});
