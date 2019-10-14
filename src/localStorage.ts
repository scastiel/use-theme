import { ThemeName } from './theme'

export const getLocalStorageTheme = () => {
  const localTheme =
    window.localStorage && (window.localStorage.getItem('theme') as ThemeName)
  if (localTheme && ['light', 'dark'].includes(localTheme)) {
    return localTheme
  }
}

export const setLocalStorageTheme = (theme: ThemeName) => {
  localStorage.setItem('theme', theme)
}
