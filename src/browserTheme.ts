// tslint:disable: deprecation
import { ThemeName } from './theme'

const mql =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

export const getBrowserTheme = () => (mql.matches ? 'dark' : 'light')

export const onBrowserThemeChanged = (callback: (theme: ThemeName) => void) => {
  const mqlListener = (e: any) => callback(e.matches ? 'dark' : 'light')
  mql && mql.addListener(mqlListener)
  return () => mql && mql.removeListener(mqlListener)
}
