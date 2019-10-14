import React, {
  Context,
  createContext,
  Dispatch,
  FC,
  SetStateAction,
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
  const [theme, setTheme] = useState<ThemeName>(
    getLocalStorageTheme() || getBrowserTheme()
  )

  const updateTheme: Dispatch<SetStateAction<ThemeName>> = newTheme => {
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
  }

  useEffect(() => onBrowserThemeChanged(updateTheme), [])

  return (
    <ThemeContext.Provider value={[theme, updateTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
