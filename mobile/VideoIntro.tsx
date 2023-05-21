import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Video } from 'expo-av'

const VideoIntro: React.FC = () => {
  const videoRef = useRef<Video>(null)

  useEffect(() => {
    ;(async () => {
      await videoRef.current?.loadAsync(require('./assets/video.mp4'))
      await videoRef.current?.playAsync()
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        shouldPlay={false}
        isLooping={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
})

export default VideoIntro
