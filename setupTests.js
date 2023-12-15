// setupTests.js

import "@testing-library/jest-dom";
// Add any other setup code or imports here
const { TextEncoder, TextDecoder } = require("util");

Object.assign(global, { TextDecoder, TextEncoder });
