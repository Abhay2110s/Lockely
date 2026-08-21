# PassGuardian 🛡️

A modern, high-security MERN-stack password manager built with **Zero-Knowledge Architecture**, **AES-256-GCM Vault Encryption**, **httpOnly Cookie Authentication**, and **TOTP Two-Factor Authentication**.

---

## 🔒 Security & Architecture Overview

### 1. Zero-Knowledge Vault Encryption
- **Key Derivation (PBKDF2-SHA256)**: The browser derives a non-exportable 256-bit AES-GCM `CryptoKey` from the user's master password and a unique 32-byte `vaultKeySalt` (OWASP-recommended 210,000 iterations).
- **Client-Side Encryption**: Secrets are encrypted/decrypted in the browser using the Web Crypto API (`AES-256-GCM`).
- **Zero-Knowledge Backend**: The server functions strictly as an encrypted-blob store (`cipherText`, `iv`, `authTag`). Plaintext secrets and the derived key never touch the server or disk.
- **Privacy-Preserving Reuse Detection**: The browser computes a one-way `SHA-256` hash (`passwordHash`) of each password. The backend groups duplicate hashes for security score calculations without being able to decrypt the passwords.

### 2. httpOnly Cookie Authentication & CSRF Defense
- JWT tokens are issued on login/verification and stored inside an `httpOnly`, `Secure` (production), `SameSite: "Strict"` cookie (`pg_auth`).
- `SameSite: "Strict"` guarantees that browser requests originating from cross-site contexts cannot carry the auth cookie, providing resilient CSRF protection.
- The `Authorization: Bearer <token>` header is supported as a fallback for non-browser API clients.
- `withCredentials: true` is configured across Axios requests with strict CORS origin matching.

### 3. Account-Level Two-Factor Authentication (TOTP)
- Built-in RFC 6238 TOTP 2FA enrollment via `otplib` and QR code generator.
- 8 one-time bcrypt-hashed backup codes provided upon enrollment.
- Two-step login verification (`/api/v1/auth/2fa/verify`) before session cookies are issued.

---

## 📁 Repository Structure

```
PassGuardian/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Automated testing & build CI pipeline
├── Backend/
│   ├── src/
│   │   ├── config/                # Environment and Swagger configuration
│   │   ├── controllers/           # Auth, 2FA, Vault, User, and Folder controllers
│   │   ├── middleware/            # Auth, validation, error, rate-limiter, sanitization
│   │   ├── models/                # User, Password, Folder, and OTP Mongoose schemas
│   │   ├── routes/                # Versioned Express routes (/api/v1/*)
│   │   ├── services/              # Vault, email, encryption, and folder services
│   │   └── utils/                 # Password strength & entropy checker, API responses
│   └── tests/                     # Vitest backend test suite
└── frontend/
    ├── src/
    │   ├── components/            # Auth, common, settings, and UI components
    │   ├── context/               # AuthContext & ThemeContext
    │   ├── hooks/                 # useDebounce, useClipboard, useTheme, useLocalStorage
    │   ├── pages/                 # Vault, Dashboard, Settings, 2FA Challenge, Profile
    │   ├── services/              # API Axios instance, crypto.service, auth, password, user
    │   └── tests/                 # Vitest + RTL frontend test suite
    └── vite.config.js             # Vite & Vitest configuration with Tailwind v4
```

---

## ⚙️ Environment Variables

### Backend (`Backend/.env`)

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Server listening port | `3000` |
| `NODE_ENV` | Runtime environment (`development` / `production`) | `development` |
| `CLIENT_URL` | Allowed frontend origin for CORS | `http://localhost:5173` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/passguardian` |
| `ENCRYPTION_KEY` | 32-character server key for config encryption | `12345678901234567890123456789012` |
| `JWT_SECRET` | Secret key used to sign JWT access tokens | `your-secure-jwt-secret-key-min-32-chars` |
| `JWT_EXPIRES_IN` | Token expiration duration | `7d` |
| `PASSWORD_EXPIRY_DAYS` | Default vault password rotation reminder period | `90` |
| `SMTP_HOST` | SMTP server host for sending verification emails | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | SMTP username / email address | `your-email@gmail.com` |
| `SMTP_PASS` | SMTP application password | `your-app-password` |
| `EMAIL_FROM` | Outgoing email sender label | `PassGuardian <noreply@passguardian.app>` |

### Frontend (`frontend/.env`)

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Backend base URL pointing to `/api/v1` | `http://localhost:3000/api/v1` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `22.x` or higher
- MongoDB instance running locally or on MongoDB Atlas

### 1. Backend Setup

```bash
cd Backend
npm install
cp .env.example .env   # Configure environment variables
npm run dev            # Starts server on http://localhost:3000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev            # Starts Vite dev server on http://localhost:5173
```

---

## 🧪 Running Tests

Both the backend and frontend include automated test suites powered by **Vitest**.

### Backend Tests
Covers encryption layer validation, auth middleware cookies/headers, vault service logic, regex safety, and entropy/strength checker:

```bash
cd Backend
npm test
```

### Frontend Tests
Covers Web Crypto PBKDF2/AES-GCM encryption/decryption roundtrips, tampering detection, `AuthContext` state lifecycle, and `Vault` rendering:

```bash
cd frontend
npm test
```

---

## 📋 API Documentation

When the backend is running in development, interactive Swagger API docs are available at:
```
http://localhost:3000/api-docs
```
