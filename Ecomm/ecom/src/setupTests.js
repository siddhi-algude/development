import "@testing-library/jest-dom";
import "whatwg-fetch";

// Polyfills for react-router / node 20
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
