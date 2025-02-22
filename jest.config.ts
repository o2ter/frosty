export default {
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};