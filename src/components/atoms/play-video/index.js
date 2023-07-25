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
    const match = url.match(regex);
    return match && match[1];
  }

  const videoId = getYouTubeVideoId();
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
