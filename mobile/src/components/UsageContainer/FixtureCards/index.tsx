import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated'

import { useContent } from '../../../hooks/useContent'

import { Header } from '../Header'
import { FixtureCard } from '../FixtureCard'

import { styles } from './styles'

export function FixtureCards() {

  const { data, setIsExpanded, setDetailsHeaderTitle } = useContent()

  function handleCardPress(detailsHeaderTitle: string) {
    setIsExpanded(true)
    setDetailsHeaderTitle(detailsHeaderTitle)
  }

  return (
    <>
       <Animated.View
        entering={FadeIn.duration(800).delay(600)}
        style={{ paddingHorizontal: 20 }}
      >
        <Header
          title='Lihat data setiap sensor'
          buttonTitle=''
        />
      </Animated.View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.fixtureCards}
      >
        <Animated.View entering={FadeInRight.duration(250).delay(600)}>
          <FixtureCard
            icon='thermometer'
            title='Suhu'
            subtitle={data.temperature.toPrecision(4) + '°C'}
            descriptionTitle='Rentang'
            backgroundColor='#ebbc6c'
            descriptionSubtitle='0-50°C'
            iconBackgroundColor='#d9ae64'
            percentage={data.temperature / 100}
            onPress={() => handleCardPress('Suhu')}
          />
        </Animated.View>

        <Animated.View entering={FadeInRight.duration(250).delay(630)}>
          <FixtureCard
            icon='water'
            title='Kelembaban'
            subtitle={data.humidity.toPrecision(4) + '%'}
            descriptionTitle='Rentang'
            backgroundColor='#EE667D'
            descriptionSubtitle='0-50%.'
            iconBackgroundColor='#DC627B'
            percentage={data.humidity / 100}
            onPress={() => handleCardPress('Kelembaban')}
          />
        </Animated.View>

        <Animated.View entering={FadeInRight.duration(250).delay(770)}>
          <FixtureCard
            icon='smoke'
            title='Gas'
            subtitle={data.gas_level.toPrecision(4) + '%'}
            descriptionTitle='Rentang'
            backgroundColor='#6CC887'
            descriptionSubtitle='0-100%'
            iconBackgroundColor='#64B880'
            percentage={data.gas_level / 100}
            onPress={() => handleCardPress('Gas')}
          />
        </Animated.View>
      </ScrollView>
    </>
  )
}
