import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const moduleConfig: Partial<JestConfigWithTsJest> =
  process.env['JEST_ISOLATED_MODULES'] !== 'true'
    ? { preset: 'ts-jest' }
    : {
      transform: {
        '^.+\\.tsx?$': ['ts-jest',
          {
            isolatedModules: true,
            stringifyContentPathRegex: '\\.html$',
            tsconfig: {
              module: 'ESNext',
              moduleResolution: 'node',
              allowJs: true,
              skipLibCheck: true,
              esModuleInterop: true,
              allowSyntheticDefaultImports: true,
              forceConsistentCasingInFileNames: true,
              allowImportingTsExtensions: true,
              resolveJsonModule: true,
              isolatedModules: true,
              noEmit: true,
              jsx: 'react-jsx',
              useDefineForClassFields: true,
              strict: true,
            },
          },
        ]
      }
    }

export default <JestConfigWithTsJest>{
  ...moduleConfig,
  testEnvironment: 'jsdom',
  maxWorkers: '50%',
  moduleDirectories: ['node_modules', 'src'],
  watchAll: false,
  watch: false,
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
    '[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'
  ],
  coverageReporters: [
    'cobertura', ['text', { skipFull: true }]
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/stories/**/*',
    '!src/__fixtures__/**/*'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts',
    'jest-extended/all'
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}
