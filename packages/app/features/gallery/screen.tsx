import { H1, Row, Text, useSx, View } from 'dripsy';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
import { Button, Image } from 'react-native';
import { MotiLink } from 'solito/moti';
import { CameraScreen } from './camera';

export function GalleryScreen() {
  const [showCamera, setShowCamera] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(false)
    const [images, setImages] = useState<string[]>([])
  const sx = useSx()

    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false)
    useEffect(() => {
      ;(async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync()
        const mediaLibraryPermission =
          await MediaLibrary.requestPermissionsAsync()
        setHasCameraPermission(cameraPermission.status === 'granted')
        setHasMediaLibraryPermission(
          mediaLibraryPermission.status === 'granted'
        )
      })()
    }, [])

    const saveImage = (uri: string) => {
      MediaLibrary.saveToLibraryAsync(uri)
    }

    const deleteImage = (uri: string) => {
      const newImages = images.filter((image) => image !== uri)
      setImages(newImages)
    }
  
  const setImagesFn = (uri: string) => {
        setImages([...images, uri])
  }

  return (
    <View
      sx={{ flex: 1, justifyContent: 'start', alignItems: 'center', p: 16 }}
    >
      <H1 sx={{ fontWeight: '800' }}>Image Gallery</H1>
      <View sx={{ maxWidth: 600 }}>
        <MotiLink
          href="/"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}
        >
          <Text
            selectable={false}
            sx={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}
          >
            👈 Go Home
          </Text>
        </MotiLink>
      </View>
      <View sx={{ height: 32 }} />
      {!showCamera && <Row style={{ height: '600px', width: '100%' }}>
        {images &&
          images.map((image) => {
            return (
              <View key={`${image}`} style={{ flex: 1 }}>
                <Image source={{ uri: image }} style={{ flex: 1 }} />
                {hasMediaLibraryPermission && (
                  <Button
                    title="Save Picture"
                    onPress={() => saveImage(image)}
                  />
                )}
                <Button
                  title="Delete Picture"
                  onPress={() => deleteImage(image)}
                />
              </View>
            )
          })}
      </Row>}

      {!showCamera && (
        <Button title="Camera" onPress={() => setShowCamera(true)} />
      )}
      {showCamera && (
        <View sx={{ flex: 1, width: '800px' }}>
          <Button title="Cancel Camera" onPress={() => setShowCamera(false)} />
          <CameraScreen
            hasCameraPermission={hasCameraPermission}
            setImagesFn={setImagesFn}
          />
        </View>
      )}
    </View>
  )
}
