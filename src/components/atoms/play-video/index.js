import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {mvs} from 'config/metrices';

export default function YouTubeVideo({url}) {
  const [playing, setPlaying] = useState('paused');

  const onStateChange = useCallback(state => {
    setPlaying(state);
    if (state === 'ended') {
      // Alert.alert('video has finished playing!');
    }
  }, []);
  function getYouTubeVideoId() {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?youtube(?:-nocookie)?\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url?.match(regex);
    return match && match[1];
  }
  function getYouTubeVideo() {
    const lastSlashIndex = url?.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      return url?.substr(lastSlashIndex + 1);
    }
    return null;
  }
  let videoId = getYouTubeVideoId();
  if (!videoId) videoId = getYouTubeVideo();

  return (
    <View>
      <YoutubePlayer
        height={mvs(180)}
        play={playing === 'playing'}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </View>
  );
}
