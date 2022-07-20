import { Camera } from 'expo-camera';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface Props {
  hasCameraPermission: boolean
  setImagesFn: (uri: string) => void;
}

export function CameraScreen({ hasCameraPermission, setImagesFn}: Props) {
  const [camera, setCamera] = useState<Camera>(null)
  const [type, setType] = useState(Camera.Constants.Type.back)


  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImagesFn(data.uri)
    }
  }

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    )
  }


  return (
    <View style={{ flex: 1  }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'16:9'}
        />
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          )
        }}
      ></Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      
    </View>
  )
}
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
})
