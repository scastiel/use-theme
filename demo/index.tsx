import React, { FC, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, useTheme } from '../src/index'
import './style.css'

const App: FC = () => {
  const [theme, setTheme] = useTheme()
  const toggleTheme = useCallback(() => {
    setTheme(currenTheme => (currenTheme === 'dark' ? 'light' : 'dark'))
  }, [setTheme])
  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>
        Theme: <strong>{theme}</strong>
        <br />
        Click to change
      </button>
    </div>
  )
}

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('app')
)
