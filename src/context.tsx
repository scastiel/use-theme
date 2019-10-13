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

const ThemeContext: Context<
  [ThemeName, Dispatch<SetStateAction<ThemeName>>]
> = createContext(['light' as ThemeName, _ => {}])

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
