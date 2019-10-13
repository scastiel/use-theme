## Usage

```js
import React, { useCallbacl } from 'react'
import { useTheme, ThemeProvider } from 'use-theme'

const ChangeThemeButton = ({ children, theme }) => {
  const [currentTheme, setTheme] = useTheme()
  const changeTheme = useCallback(() => setTheme(theme), [theme, setTheme])
  return (
    <button
      className={theme === currentTheme ? 'active' : ''}
      onClick={changeTheme}
    >
      {children}
    </button>
  )
}

const App = () => {
  const [theme, setTheme] = useTheme()
  return (
    <div className={theme}>
      <ChangeThemeButton theme="dark">Dark theme</ChangeThemeButton>
      <ChangeThemeButton theme="light">Light theme</ChangeThemeButton>
    </div>
  )
}

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('app')
)
```
