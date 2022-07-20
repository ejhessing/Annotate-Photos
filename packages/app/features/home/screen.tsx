import { A, H1, P, Row, Text, useSx, View } from 'dripsy'
import { MotiLink } from 'solito/moti'

export function HomeScreen() {
  const sx = useSx()

  return (
    <View
      sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', p: 16 }}
    >
      <H1 sx={{ fontWeight: '800' }}>Image Annotation Example Project</H1>
      <View sx={{ maxWidth: 600 }}>
        <P sx={{ textAlign: 'center' }}>
          Simple project using React Native Expo + NextJS to create a single code base for native and web.
        </P>
        <P sx={{ textAlign: 'center' }}>
          This project is made by{' '}
          <A
            href="https://www.ejhessing.com"
            // @ts-expect-error react-native-web only types
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
            sx={{ color: 'blue' }}
          >
            Ej Hessing
          </A>
          .
        </P>
      </View>
      <View sx={{ height: 32 }} />
      <Row>
        <View sx={{ width: 32 }} />
        <MotiLink
          href="/gallery"
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
            Go to Image Gallery
          </Text>
        </MotiLink>
      </Row>
    </View>
  )
}
