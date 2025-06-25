# Artisan App

## Project Overview
Artisan App is a React Native (Expo) application designed to connect customers with skilled artisans. The app features authentication, user and artisan flows, chat, bookings, and portfolio management.

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
3. **Run on your device or emulator** using the Expo Go app or your preferred simulator.

## What to Focus On
- **Navigation:** The app uses React Navigation to manage authentication, user, and artisan flows.
- **Screens:** Each feature (login, register, dashboard, etc.) has its own screen in the `screens/` directory.
- **State Management:** App state is managed in the `store/` directory.
- **Services:** Firebase and other backend services are in the `services/` directory.

## How the Project Works
- **App Entry Point:** `App.tsx` initializes the navigation container and loads the appropriate navigator based on user state.
- **Navigation:**
  - `navigation/RootNavigator.tsx`: Decides which navigator to show (auth, user, artisan).
  - `navigation/AuthNavigator.tsx`: Stack navigator for Welcome, Login, and Register screens.
  - `navigation/UserNavigator.tsx`: Bottom tab navigator for customers, with stacks for Home, Search, Bookings, and Profile.
  - `navigation/ArtisanNavigator.tsx`: Bottom tab navigator for artisans, with stacks for Dashboard, Portfolio, Jobs, and Profile.
- **Screens:**
  - `screens/auth/`: Authentication screens (Welcome, Login, Register)
  - `screens/user/`: Customer screens (Home, Profile, Search, View Artisan)
  - `screens/artisan/`: Artisan screens (Dashboard, Portfolio, Jobs, Reviews)
  - `screens/shared/`: Shared screens (Chat, Bookings, Notifications, Settings)
- **Components:** Reusable UI components (buttons, cards, inputs, etc.)
- **Constants:** App-wide constants for colors, fonts, and layout.
- **Services:** Firebase, authentication, notifications, and storage logic.
- **Store:** State management (e.g., user and artisan stores).
- **Types:** TypeScript type definitions for users, bookings, artisans, etc.
- **Utils:** Utility functions (date formatting, validation, etc.)

## How to Continue
- **Implement authentication logic** in `RootNavigator` to switch between Auth, User, and Artisan flows based on login state and user type.
- **Build out screens** in the `screens/` directory as needed.
- **Connect to backend services** using the files in `services/`.
- **Add new features** by creating new screens, components, or services.
- **Write tests** for your components and logic.

## Contributing
- Fork the repo and create a new branch for your feature or bugfix.
- Make your changes and submit a pull request.
- Please follow the existing code style and structure.

---

**Checklist:**
- [ ] Install dependencies
- [ ] Run the app
- [ ] Explore navigation flows
- [ ] Implement authentication logic
- [ ] Build and test features

---

For any questions or issues, please open an issue or contact the maintainer.

## Project Structure

```
artisan-app/
├── assets/                    # Static files
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── components/                # Reusable UI components
│   ├── buttons/
│   │   └── PrimaryButton.tsx
│   ├── cards/
│   │   └── ArtisanCard.tsx
│   ├── inputs/
│   │   └── SearchBar.tsx
│   └── shared/
│       ├── Avatar.tsx
│       ├── StarRating.tsx
│       └── Divider.tsx
│
├── constants/                 # Global styles
│   ├── colors.ts
│   ├── fonts.ts
│   └── layout.ts
│
├── navigation/                # Navigation setup (typed)
│   ├── index.tsx              # Root switch logic
│   ├── AuthNavigator.tsx
│   ├── UserNavigator.tsx
│   ├── ArtisanNavigator.tsx
│   ├── types.ts               # Navigation type definitions
│   └── RootNavigator.tsx
│
├── screens/                   # Pages/screens
│   ├── auth/
│   │   ├── WelcomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   ├── user/
│   │   ├── HomeScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── ViewArtisanScreen.tsx
│   ├── artisan/
│   │   ├── ArtisanDashboard.tsx
│   │   ├── ManagePortfolio.tsx
│   │   ├── JobRequests.tsx
│   │   └── ReviewClients.tsx
│   └── shared/
│       ├── BookingScreen.tsx
│       ├── ChatScreen.tsx
│       ├── NotificationsScreen.tsx
│       └── SettingsScreen.tsx
│
├── services/                  # Firebase/API logic
│   ├── auth.ts
│   ├── firebase.ts
│   ├── firestore.ts
│   ├── storage.ts
│   └── notifications.ts
│
├── store/                     # Zustand stores
│   ├── userStore.ts
│   ├── artisanStore.ts
│   └── appStore.ts
│
├── types/                     # Custom types/interfaces
│   ├── user.ts
│   ├── artisan.ts
│   ├── booking.ts
│   └── firebase.ts
│
├── utils/                     # Utility functions
│   ├── formatDate.ts
│   ├── validatePhone.ts
│   ├── uploadImage.ts
│   └── locationHelpers.ts
│
├── App.tsx                    # App entry point
├── app.json
├── tsconfig.json
├── package.json
└── README.md
```

### Note
- The following folders/files are missing and will be created:
  - `assets/fonts/`, `assets/icons/`, `assets/images/`
  - `screens/artisan/ReviewClients.tsx`
  - `screens/shared/` and all its files
  - `services/` and all its files
  - `store/` and all its files
  - `types/` and all its files
  - `utils/` and all its files 