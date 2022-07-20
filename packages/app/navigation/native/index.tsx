import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { GalleryScreen } from '../../features/gallery/screen'
import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  gallery: undefined
  'user-detail': {
    id: string
  }
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
      <Stack.Screen
        name="gallery"
        component={GalleryScreen}
        options={{
          title: 'Gallery',
        }}
      />
    </Stack.Navigator>
  )
}
