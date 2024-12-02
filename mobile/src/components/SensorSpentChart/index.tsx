import { View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { CartesianChart, Line } from 'victory-native'

import { HeaderSubtitle } from './HeaderSubtitle'

import { styles } from './styles'
import { useEffect, useState } from 'react'
import { useContent } from '../../hooks/useContent'

export function SensorSpentChart() {
  const { data } = useContent()
  const [dataset, setDataset] = useState<number[]>([13, 20, 32, 10, 21])

  useEffect(() => {
    setDataset([ ...dataset, Math.round(data.temperature) ])
  }, [data])

  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(500).delay(200)}
      exiting={FadeOut.duration(600)}
    >
      <View style={styles.header}>
        <HeaderSubtitle
          title='Nilai terendah'
          subtitle={Math.min(...dataset)}
        />

        <View style={styles.separator}/>

        <HeaderSubtitle
          title='Nilai tertinggi'
          subtitle={Math.max(...dataset)}
        />
      </View>

      <CartesianChart
        data={dataset.map((y, x) => ({ x, y }))}
        xKey="x"
        yKeys={[ 'y' ]}
      >
        {(teuing) => teuing && (
          <Line
            points={teuing.points.y}
            color="#567ed6"
            strokeWidth={4}
          />
        )}
      </CartesianChart>
    </Animated.View>
  )
}
