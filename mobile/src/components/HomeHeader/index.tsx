import { BackHandler, TouchableOpacity, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { styles } from './styles'

export function HomeHeader() {
  return (
    <Animated.View
      style={styles.header}
      entering={FadeIn.duration(800)}
      exiting={FadeOut}
    >
      <TouchableOpacity onPress={() => BackHandler.exitApp()}>
        <Feather
          name="log-out"
          size={26}
          color="#fbfafc"
        />
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://ui-avatars.com/api/?name=Orang+Pintar' }}
        style={styles.image}
      />
    </Animated.View>
  )
}
