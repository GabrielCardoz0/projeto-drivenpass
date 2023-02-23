// module.exports = {
//     preset: "ts-jest",
//     testEnvironment: "node",
//     moduleDirectories: ["node_modules", "src"],
//     transform: {
//       ".+\\.ts$": "ts-jest",
//     },
//     testMatch: ["<rootDir>/tests/integration/*.(test|spec).ts"],
//   };

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
}