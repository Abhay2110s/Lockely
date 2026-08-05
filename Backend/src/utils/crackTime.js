// Crack Time Estimator — estimates how long it would take to brute-force
// a password based on its entropy, assuming an attacker can try
// approximately 1 trillion (10^12) guesses per second.
export const estimateCrackTime = (entropy) => {

  // Total possible combinations = 2^entropy.
  const combinations = Math.pow(2, entropy);

  // Assume attacker can make 1 trillion guesses/second.
  const guessesPerSecond = 1e12;

  // Average guesses needed = half of total combinations.
  const seconds = combinations / (2 * guessesPerSecond);

  // Convert seconds into human-readable time buckets.
  if (seconds < 1) {
    return "Instantly";
  }

  if (seconds < 60) {
    return `${seconds.toFixed(2)} seconds`;
  }

  if (seconds < 3600) {
    return `${(seconds / 60).toFixed(2)} minutes`;
  }

  if (seconds < 86400) {
    return `${(seconds / 3600).toFixed(2)} hours`;
  }

  if (seconds < 31536000) {
    return `${(seconds / 86400).toFixed(2)} days`;
  }

  if (seconds < 31536000 * 1000) {
    return `${(seconds / 31536000).toFixed(2)} years`;
  }

  if (seconds < 31536000 * 1_000_000) {
    return `${(seconds / (31536000 * 1000)).toFixed(2)} thousand years`;
  }

  if (seconds < 31536000 * 1_000_000_000) {
    return `${(seconds / (31536000 * 1_000_000)).toFixed(2)} million years`;
  }

  return "Billions of years";
};