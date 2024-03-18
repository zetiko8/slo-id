import path = require('path');

/* eslint-disable */
export default {
  displayName: 'library',
  preset: '../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../coverage/library',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
