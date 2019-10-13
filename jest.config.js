module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    ['ts-jest']: {
      diagnostics: false
    }
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**', '!**/*.d.ts'],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: -10
    }
  }
}
