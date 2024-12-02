import { useEffect } from 'react'
import { Platform, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Canvas, Easing, LinearGradient, Path, Skia, runTiming, useValue, vec } from '@shopify/react-native-skia'

import { styles } from './styles'
import { useContent } from '../../hooks/useContent'

const CIRCLE_SIZE = Platform.OS === 'ios' ? 290 : 240
const CIRCLE_STROKE = Platform.OS === 'ios' ? 24 : 18
const RADIUS = (CIRCLE_SIZE - CIRCLE_STROKE) / 2

export function CircleChart() {

  const percentage = useValue(0)
  const { data } = useContent()

  const path = Skia.Path.Make()
  path.addCircle(CIRCLE_SIZE, CIRCLE_SIZE, RADIUS)

  useEffect(() => {
    const { temperature, gas_level, humidity } = data
    const average = (humidity*1.4 + gas_level + temperature*2) / 3

    runTiming(percentage, average, { easing: Easing.ease })
  }, [data])

  return (
    <Animated.View
      entering={FadeIn.duration(800)}
      exiting={FadeOut}
      style={styles.container}
    >
      <View style={styles.charContainer}>
        <Canvas style={[{ width: CIRCLE_SIZE * 2, height: CIRCLE_SIZE * 2 }, styles.chart ]}>
          <Path
            path={path}
            color='#182a90'
            style='stroke'
            strokeWidth={CIRCLE_STROKE}
            start={0}
            end={0.7}
            strokeCap='round'
          />

          <Path
            path={path}
            style='stroke'
            strokeWidth={CIRCLE_STROKE}
            start={0}
            end={percentage.current / 170}
            strokeCap='round'
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, 360)}
              colors={["#2A6EDD", "#469CE8", '#63CBF6']}
            />
          </Path>
        </Canvas>
      </View>

      <View style={styles.textsContainer}>
        <Text style={styles.title}>
          Rata-rata nilai sensor
        </Text>

        <Text style={styles.subtitle}>
          {(percentage.current).toPrecision(4)}%
        </Text>
      </View>
    </Animated.View>
  )
}
