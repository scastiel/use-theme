import { fireEvent, render } from '@testing-library/react'
import React, { FC, useCallback } from 'react'
import { act } from 'react-dom/test-utils'
import { ThemeProvider, useTheme } from '../context'

global.window = {}

const TestComponent: FC = () => {
  const [theme, setTheme] = useTheme()
  const toggleTheme = useCallback(() => {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'))
  }, [setTheme])
  const setDarkTheme = useCallback(() => {
    setTheme('dark')
  }, [setTheme])

  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button data-testid="btnToggleTheme" onClick={toggleTheme} />
      <button data-testid="btnSetDarkTheme" onClick={setDarkTheme} />
    </>
  )
}

const App: FC = () => (
  <ThemeProvider>
    <TestComponent />
  </ThemeProvider>
)

test('without window.matchMedia', () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('theme').innerHTML).toEqual('light')
  fireEvent.click(getByTestId('btnSetDarkTheme'))
  expect(getByTestId('theme').innerHTML).toEqual('dark')
})

test('with window.matchMedia', () => {
  const mql = {
    matches: true,
    addListener(callback: (e: any) => void) {
      this._callback = callback
    },
    removeListener() {
      this._callback = null
    },
    _callback: null as (null | ((e: any) => void))
  }
  global.window.matchMedia = (query: string) =>
    query === '(prefers-color-scheme: dark)' ? mql : null

  const { getByTestId } = render(<App />)
  expect(getByTestId('theme').innerHTML).toEqual('dark')
  fireEvent.click(getByTestId('btnToggleTheme'))
  expect(getByTestId('theme').innerHTML).toEqual('light')

  expect(mql._callback).not.toBeNull()
  act(() => {
    mql._callback!({ matches: true })
  })
  expect(getByTestId('theme').innerHTML).toEqual('dark')
})

test('with theme in local storage', () => {
  localStorage.setItem('theme', 'dark')
  const { getByTestId } = render(<App />)
  expect(getByTestId('theme').innerHTML).toEqual('dark')
  fireEvent.click(getByTestId('btnToggleTheme'))
  expect(getByTestId('theme').innerHTML).toEqual('light')
  expect(localStorage.getItem('theme')).toEqual('light')
})
