import React from 'react';
import {View, Text} from 'react-native';
// import Video from 'react-native-video';
import {HOTEL_DETAILS} from 'config/constants';
import {WebView} from 'react-native-webview';
const PlayVideo = ({url}) => {
  return (
    <WebView
      source={{uri: url}} // Can be a URL or a local file path
      // source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }} // Can be a URL or a local file path
      style={{flex: 1}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={false}
      scalesPageToFit={true}
    />
  );
};
export default PlayVideo;
