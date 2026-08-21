import "@testing-library/jest-dom";
import { webcrypto } from "node:crypto";

// Ensure Web Crypto API is available in the JSDOM test environment
if (!globalThis.crypto || !globalThis.crypto.subtle) {
  globalThis.crypto = webcrypto;
}
