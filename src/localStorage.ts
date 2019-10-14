import { ThemeName } from './theme'

export const getLocalStorageTheme = () => {
  const localTheme =
    // tslint:disable-next-line: strict-type-predicates
    typeof window !== 'undefined' &&
    window.localStorage &&
    (window.localStorage.getItem('theme') as ThemeName)
  if (localTheme && ['light', 'dark'].includes(localTheme)) {
    return localTheme
  }
}

export const setLocalStorageTheme = (theme: ThemeName) => {
  localStorage.setItem('theme', theme)
}
