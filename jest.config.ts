import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
//   moduleNameMapper: {
//     "\\.(css|scss|sass)$": "identity-obj-proxy" // Mock CSS imports
//   }
};

export default config;
