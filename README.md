# YesOpen prototype

Clickable prototype of YesOpen onboarding and Home, built from the Figma design. Fake data, no backend.

```bash
npm install
npm run dev
```

Open http://localhost:3000 and pick a screen from the Mobile or Desktop list. The switcher in the bottom-right corner moves between screens (arrow keys work too) and toggles Mobile / Desktop.

- `src/screens/onboarding` — onboarding 01a–08
- `src/screens/home` — Home states 10a–10d
- `src/components` — shared UI (buttons, top bar, tab bar, Home modules)
- `src/app/globals.css` — colour and text tokens from Figma

Next.js 15, Tailwind CSS 4, Manrope.
