module.exports = {
  preset: 'ts-jest',
  globals: {},
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    // sementara di add satu satu
    'components/loginKompas/*.vue',
    'components/changePassword/*.vue'
    // 'components/**/*.vue',
    // 'layouts/**/*.vue',
    // 'pages/**/*.vue',
    // 'store/**/*.ts',
  ],
}
