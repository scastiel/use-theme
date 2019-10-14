import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { getBrowserTheme, onBrowserThemeChanged } from './browserTheme'
import { getLocalStorageTheme, setLocalStorageTheme } from './localStorage'
import { ThemeName } from './theme'

// FIXME we have to give createContext a valid initial value even if in this
// case it will never be used.
const ThemeContext = createContext(([null, null] as unknown) as [
  ThemeName,
  Dispatch<SetStateAction<ThemeName>>
])

export const ThemeProvider: FC = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  const [theme, setTheme] = useState<ThemeName>('light')

  const updateTheme: Dispatch<SetStateAction<ThemeName>> = useCallback(
    newTheme => {
      if (typeof newTheme === 'function') {
        setTheme(currentTheme => {
          const actualNewTheme = newTheme(currentTheme)
          setLocalStorageTheme(actualNewTheme)
          return actualNewTheme
        })
      } else {
        setLocalStorageTheme(newTheme)
        setTheme(newTheme)
      }
    },
    [setTheme]
  )

  useEffect(() => {
    if (!initialized) {
      setTheme(getLocalStorageTheme() || getBrowserTheme())
      setInitialized(true)
    }
    return onBrowserThemeChanged(updateTheme)
  }, [setTheme, initialized, setInitialized, updateTheme])

  return initialized ? (
    <ThemeContext.Provider value={[theme, updateTheme]}>
      {children}
    </ThemeContext.Provider>
  ) : null
}

export const useTheme = () => useContext(ThemeContext)
