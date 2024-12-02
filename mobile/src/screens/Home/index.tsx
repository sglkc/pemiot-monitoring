import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TimeFilter } from '../../components/TimeFilter'
import { HomeHeader } from '../../components/HomeHeader'
import { CircleChart } from '../../components/CircleChart'
import { DetailsHeader } from '../../components/DetailsHeader'
import { UsageContainer } from '../../components/UsageContainer'
import { EspecifcTimeFilter } from '../../components/EspecifTimeFilter'

import { useContent } from '../../hooks/useContent'

import { styles } from './styles'

export function Home() {

  const { expanded, setIsExpanded } = useContent()

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (expanded) {
        setIsExpanded(false)
      } else {
        BackHandler.exitApp()
      }

      return true
    })

    return () => void backHandler.remove()
  }, [expanded])

  return (
    <SafeAreaView style={styles.container}>

      {expanded ? (
        <>
          <DetailsHeader/>
        </>
      ) : (
        <>
          <HomeHeader />
          <CircleChart />
        </>
      )}

      <UsageContainer/>
    </SafeAreaView>
  )
}
