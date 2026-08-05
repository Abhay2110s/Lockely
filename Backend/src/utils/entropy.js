// Entropy Calculator — estimates how difficult a password is to guess
// based on the size of its character pool and length.
// Formula: Entropy = passwordLength × log2(characterPoolSize)
// The larger the entropy value, the stronger the password.

export const calculateEntropy = (password) => {
  let poolSize = 0;

  // Check which character sets are used and accumulate the pool size.
  if (/[a-z]/.test(password)) {
    poolSize += 26;
  }

  if (/[A-Z]/.test(password)) {
    poolSize += 26;
  }

  if (/\d/.test(password)) {
    poolSize += 10;
  }

  // Count printable special characters.
  if (/[^a-zA-Z0-9]/.test(password)) {
    poolSize += 32;
  }

  // Empty password has zero entropy.
  if (poolSize === 0) {
    return 0;
  }

  // Shannon-style entropy estimation.
  const entropy = password.length * Math.log2(poolSize);

  // Round to 2 decimal places for readability.
  return Number(entropy.toFixed(2));
};