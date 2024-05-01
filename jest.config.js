module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-leaflet)/',
  ],
  moduleNameMapper: {
    'react-leaflet': '<rootDir>/node_modules/react-leaflet/dist/es/index.js',
  },
};
