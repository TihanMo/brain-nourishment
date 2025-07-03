```markdown
# Brain Nourishment 🧠📱

Brain Nourishment is a mobile app built with **React Native** using **Expo**. It offers a collection of **offline-capable minigames** that stimulate cognitive skills and help users activate their brain after long periods of passive screen time (e.g., doomscrolling).

## 🧩 Concept

This app is the digital counterpart to “Brain Rot” — instead of numbing your brain with endless content, Brain Nourishment delivers **quick, engaging challenges**. Each game requires focus, reaction, or memory.

### Core Features

- 🎮 Launch and play multiple minigames
- 📈 View high scores for each game
- ⚙️ Customize settings (Sound, Dark Mode, Vibration)
- 🌙 Dark Mode support
- 📵 Fully offline — no internet required
- 💥 Crash-safe: All user actions are gracefully handled

---

## 🔧 Architecture

The app is organized using a **modular component system** and follows clean separation of concerns:

```

/brain-nourishment
├── /assets               # Images, sounds, etc.
├── /components           # Reusable UI (buttons, modals)
├── /constants            # Theme colors, sizes, configs
├── /navigation           # Stack Navigator config
├── /screens              # Main screens per route
│   ├── HomeScreen.js
│   ├── ReactionGameScreen.js
│   ├── ColorMatchScreen.js
│   ├── HighscoreScreen.js
│   ├── SettingsScreen.js
│   └── PostGameScreen.js
├── /games                # Logic for each minigame
│   ├── ReactionGame.js
│   ├── ColorMatchGame.js
├── App.js                # Entry point with NavigationContainer
└── app.json / package.json

```

---

## 📱 Functional Requirements

| Feature | Description |
|--------|-------------|
| Game Launch | Users can start minigames from the Home screen |
| Highscores | Displays the top scores for each game |
| Settings | Change dark mode, sound, and vibration |
| Offline Mode | Entire app functions without internet |
| Post-Game | Score screen with retry option after each game |

---

## 🚀 Non-Functional Requirements

| Category           | Goal                                      |
|--------------------|--------------------------------------------|
| Performance        | App starts in under 2 seconds              |
| Usability          | Intuitive within 30 seconds for new users  |
| Offline Capability | 100% offline functionality                 |
| App Size           | Under 50 MB                                |
| Compatibility      | Works on Android 10+ and iPhone (Expo Go)  |
| Accessibility      | Optional haptic feedback on interactions   |
| Stability          | No crashes during normal usage             |
| Privacy            | No personal data collected or stored       |

---

## 🧪 Test Strategy

The app is tested via:

- ✅ Manual tests on Expo Go (iOS)
- ⚫️ Blackbox testing: UI reaction without looking into code
- 🕹️ Explorative testing: try unexpected inputs
- 🔁 Game mechanics validation (tap, timer, post-screen)

---

## 🧠 Sample Test Cases

| # | Test Case | Expected Result |
|--|-----------|-----------------|
| 1 | App launch | Loads start screen fast |
| 2 | Reaction Time Game | Shows instructions, reacts to tap |
| 3 | Color Match Game | Color/word logic & timer works |
| 4 | Highscore | Lists stored scores |
| 5 | Settings | Changes apply and persist |
| 6 | Offline usage | App is fully functional |
| 7 | Post-Game screen | Score and Retry button show |
| 8 | Reopening App | App state is preserved |

---

## 🛠 Tech Stack

- **React Native** with **Expo**
- **React Navigation** (`@react-navigation/native`)
- Supports iOS and Android (portrait mode)

---

## 📌 Future Ideas

- 🧩 Add more challenging games
- 🌐 Optional cloud sync (not in v1)
- 🗣 Accessibility improvements (voice, bigger fonts)

---

> 💡 This README was written to help Copilot / Codex understand the project context. It includes file structure, functional logic, and design intent. Suggest code that fits the project conventions and goals.
