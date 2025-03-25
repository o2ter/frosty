export default {
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  }, 
  setupFiles: [
    "<rootDir>/node_modules/core-js"
  ],
};