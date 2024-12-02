import { ReactNode, createContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client'

export type SensorData = {
  temperature: number
  humidity: number
  gas_level: number
}

export type ContentContextDataProps = {
  data: SensorData
  expanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  detailsHeaderTitle: string;
  setDetailsHeaderTitle: React.Dispatch<React.SetStateAction<string>>;
  selectedEspecificTimeFilter: number;
  setSelectedEspecificTimeFilter: React.Dispatch<React.SetStateAction<number>>;
}

type ContentContextProviderProps = {
  children: ReactNode
}

export const ContentContext = createContext<ContentContextDataProps>({} as ContentContextDataProps)

export function ContentContextProvider({ children }: ContentContextProviderProps) {

  const [expanded, setIsExpanded] = useState(false)
  const [detailsHeaderTitle, setDetailsHeaderTitle] = useState('')
  const [selectedEspecificTimeFilter, setSelectedEspecificTimeFilter] = useState(0)
  const [data, setData] = useState<SensorData>({
    temperature: 0,
    humidity: 0,
    gas_level: 0
  })

  useEffect(() => {
    const socket = io('http://172.20.10.4:5000', {
      transports: [ 'websocket' ],
      secure: false
    })

    socket.on('random_data', setData)

    return () => void socket.disconnect()
  }, [])

  return (
    <ContentContext.Provider value={{
      data,
      expanded,
      setIsExpanded,
      detailsHeaderTitle,
      setDetailsHeaderTitle,
      selectedEspecificTimeFilter,
      setSelectedEspecificTimeFilter
    }}>
      {children}
    </ContentContext.Provider>
  )
}
