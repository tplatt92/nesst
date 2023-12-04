// jest.config.js

module.exports = {
  // other Jest configurations...

  setupFilesAfterEnv: ["@testing-library/react"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
