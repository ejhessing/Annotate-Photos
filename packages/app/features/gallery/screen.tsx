import { H1, Row, Text, useSx, View } from 'dripsy'
import { MotiLink } from 'solito/moti'

export function GalleryScreen() {
  const sx = useSx()

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
      <Row></Row>
      <View sx={{}}></View>
    </View>
  )
}
