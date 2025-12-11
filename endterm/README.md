# Star Wars Characters PWA

A Progressive Web App (PWA) built with **React**, **Redux**, and **Firebase** that allows users to explore Star Wars characters, manage favorites, and maintain a personalized profile with authentication and profile picture upload. The app is fully offline‑capable and installable.

---

## ✨ Features

- **Authentication**
  - Firebase Authentication (Signup, Login, Logout)
  - Email validation, password complexity checks, repeat password validation
  - Protected routes (`/profile`) redirect unauthenticated users to `/login`
  - Auth state stored in Redux for reactivity

- **Pages**
  - Home 
  - Login & Signup
  - Characters List
  - Character Details
  - Favorites
  - Profile (protected)

- **External API**
  - Uses Star Wars API (SWAPI) for characters
  - List endpoint with 20+ items
  - Details endpoint with 7+ fields per character

- **Search & Filtering**
  - Query parameters for search and filters
  - Pagination with query parameters

- **Data Layer**
  - Services separated into:
    - `authService.js`
    - `favoritesService.js`
    - `itemsService.js`
    - `imageService.js`
  - Each service contains only data logic and returns promises

- **Hooks**
  - Built‑in: `useState`, `useEffect`, `useMemo`, `useCallback`

- **PWA & Service Worker**
  - `manifest.json` with icons
  - Service worker registered and active
  - App shell cached
  - Network‑first caching strategy
  - Offline banner displayed when offline

- **Favorites**
  - Visitors: stored in `localStorage`, persisted across reloads
  - Logged‑in users: stored in Firestore under UID
  - Favorites merge on login with UI message

- **Profile Picture Upload**
  - Upload `.jpg` / `.png`
  - Compression in Web Worker
  - Saved to Firebase DB
  - URL stored in Firestore
  - Rendered in header and profile page
 
- **Multi-language support**
  - i18n (KZ, EN, RU)

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Redux Toolkit, React Icons
- **Backend / Auth:** Firebase Authentication, Firestore Database
- **API:** SWAPI (Star Wars API)
- **PWA:** Service Worker, manifest.json
- **Styling:** CSS (custom Star Wars theme)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 16)
- Firebase project with Authentication, Firestore, and Storage enabled

### Installation
```bash
# Clone repo
git clone https://github.com/uadinaa/React.git
cd endterm

# Install dependencies
npm install
npm install react-router-dom
npm install firebase 
npm install react-redux
npm install react-icons
npm install dompurify
npm install @reduxjs/toolkit

# Start development server
npm run dev
