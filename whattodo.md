# Project Log & To-Do

This file tracks all changes, instructions, errors, and fixes for the Artisan App project. Update this file with every significant change, error, and solution.

---

## Change Log
- **[INIT]** Project structure set up with navigation folders and screens.
- **[ADD]** Navigation system implemented (`App.tsx` now uses `RootNavigator` and `NavigationContainer`).
- **[ADD]** Installed React Navigation packages and dependencies.
- **[ADD]** Created comprehensive `README.md` for project overview and onboarding.
- **[UPDATE]** Changed onboarding flow: After completing onboarding, user is navigated to WelcomeScreen, which then automatically transitions to LoginScreen after a short animated welcome.
- **[ENHANCE]** WelcomeScreen now features animated logo, brand illustration, and improved UI/UX with smooth transitions and loading indicator.
- **[FIX]** Updated OnboardingScreen to set onboardingCompleted and navigate to WelcomeScreen instead of LoginScreen directly.
- **[ADD]** Registration now saves userType (customer or artisan) to AsyncStorage.
- **[FEATURE]** RootNavigator now checks userType from AsyncStorage and switches between UserNavigator and ArtisanNavigator accordingly.
- **[UPDATE]** LoginScreen now checks userType after login and navigates to the correct home screen (ArtisanDashboard or Home).
- **[ENHANCE]** ProfileScreen now uses a modal for logout confirmation. Logout updates global auth state (AuthContext), which triggers RootNavigator to switch to AuthNavigator and show WelcomeScreen.
- **[ADD]** Implemented AuthContext for global authentication state and logout flow.
- **[ADD]** Added new screens for artisans:
  - **Account Settings** (profile, password, notifications, logout)
  - **Account Details** (view artisan info)
  - **Notifications** (modern notification list)
  - **Settings** (notification preferences, theme, logout)
- **[ENHANCE]** All new screens are accessible from the artisan dashboard (three-dots menu and bell icon).
- **[ENHANCE]** Navigation is now consistent for both user and artisan flows.
- **[ENHANCE]** All dashboard icons and stats use professional Ionicons.

---

## To-Do
- [x] Implement authentication logic in `RootNavigator` to switch between Auth, User, and Artisan flows.
- [x] Add AuthContext for global auth state and logout.
- [x] Update ProfileScreen to use modal confirmation and update auth state on logout.
- [ ] Build out missing screens and connect navigation flows.
- [ ] Connect to backend services (Firebase, etc.).
- [ ] Add error handling and user feedback.
- [ ] Write and run tests for components and logic.
- [ ] Update this file with every change, error, and fix.

---

## Errors & Fixes
- **Error:** `Cannot find module '@react-navigation/native' or its corresponding type declarations.`
  - **Fix:** Installed required navigation packages with:
    ```bash
    npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
    ```
- No new errors encountered during userType-based navigation implementation and login redirect.

---

## Developer Notes
- After making any change (feature, bugfix, refactor), add an entry to the Change Log above.
- If you encounter an error, document it in the Errors & Fixes section with the solution.
- Use the To-Do section to track ongoing and future tasks.
- Keep this file up to date for team transparency and onboarding.

## Recent Changes
- Added new screens for artisans:
  - **Account Settings** (profile, password, notifications, logout)
  - **Account Details** (view artisan info)
  - **Notifications** (modern notification list)
  - **Settings** (notification preferences, theme, logout)
- All new screens are accessible from the artisan dashboard (three-dots menu and bell icon).
- Navigation is now consistent for both user and artisan flows.
- All dashboard icons and stats use professional Ionicons.

## Next Steps
- Connect Account Settings and Details to real backend/user data.
- Implement notification fetching and display.
- Add theme switching logic in Settings.
- Polish UI for responsiveness and accessibility.
- Add tests for navigation and screen rendering.

## TODO (Next Steps)
- [ ] Connect Account Settings and Account Details screens to real backend/user data (Firebase, API, etc.)
- [ ] Implement notification fetching and display for artisans
- [ ] Enable theme switching (light/dark mode) in Settings
- [ ] Add edit functionality to Account Details (allow profile updates)
- [ ] Improve error handling and user feedback throughout the app
- [ ] Add tests for navigation, screen rendering, and user flows
- [ ] Polish UI for responsiveness and accessibility (tablet/mobile, color contrast, etc.)
- [ ] Review and refactor navigation for maintainability
- [ ] Update documentation as new features are added
