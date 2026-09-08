# FX Checker

A responsive foreign-exchange dashboard built for the [Frontend Mentor FX Checker challenge](https://www.frontendmentor.io/challenges/foreign-exchange-currency-converter). Convert currencies with current rates, explore historical performance, compare currencies, and save frequently used pairs.

![FX Checker project preview](./preview.jpg)

## Features

- Real-time currency conversion using current exchange-rate data
- Searchable currency selectors with country flags, codes, and names
- One-click swapping between the send and receive currencies
- Historical rate chart with 1D, 1W, 1M, 3M, 1Y, and 5Y ranges
- Open, latest, absolute-change, and percentage-change statistics
- Multi-currency comparison table with reference rates
- Favorite currency pairs with quick access to saved conversions
- Conversion log with individual deletion and clear-all controls
- Live market ticker showing rates and daily movement
- Persistent converter state, favorites, and logs using `localStorage`
- Loading, empty, and error states for API-driven content
- Responsive layouts and controls for mobile and desktop screens
- Keyboard-accessible interactive controls

## Built with

- [Vite 8](https://vite.dev/), [React 19](https://react.dev/), and [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest) for fetching, caching, and synchronizing exchange-rate data
- [Frankfurter API](https://frankfurter.dev/) for current and historical currency rates
- React Context and `useReducer` for shared application state
- [Base UI](https://base-ui.com/) and Radix UI primitives for accessible interactions
- [Recharts](https://recharts.org/) for historical rate visualization
- CSS Modules, SCSS, CSS custom properties, Flexbox, Grid, and [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/) with accessibility and Vitest integrations for component development
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) for static analysis

## Getting started

### Prerequisites

- Node.js `20.19+`
- npm

### Installation

```bash
git clone https://github.com/Zeeka32/currency-converter.git
cd currency-converter
npm install
npm run dev
```

Open the local URL shown by Vite in your browser. No environment variables are required; the app requests public exchange-rate data directly from the Frankfurter API.

## Available scripts

| Command                   | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `npm run dev`             | Start the Vite development server                    |
| `npm run build`           | Type-check the project and create a production build |
| `npm run preview`         | Preview the production build locally                 |
| `npm run lint`            | Run Oxlint across the project                        |
| `npm run storybook`       | Start Storybook on port 6006                         |
| `npm run build-storybook` | Create a static Storybook build                      |

## How it works

The selected source currency is used to request its current quote rates from the Frankfurter API. The app derives the active conversion from the entered amount and selected target rate, while TanStack Query caches responses for five minutes to avoid unnecessary requests.

Historical chart requests adapt to the selected range: shorter ranges use daily observations, while longer ranges group results by week or month. The chart derives its open, latest, absolute-change, and percentage-change values from the returned series.

React Context and a reducer coordinate the amount, selected currencies, chart range, favorites, and conversion log across the interface. That state is saved to `localStorage`, allowing the user's selections and saved data to persist between visits.

## Project structure

```text
src/
├── components/
│   ├── Content/              Main converter and actions
│   ├── CurrencyGraph/        Historical rate visualization
│   ├── FavoriteTable/        Saved currency pairs
│   ├── History/              Historical chart and statistics
│   ├── LogTable/             Conversion activity log
│   ├── Marquee/              Live market ticker
│   ├── MultiConvertTable/    Multi-currency comparisons
│   ├── Navbar/               Application header
│   ├── Tabs/                 Responsive dashboard navigation
│   └── ui/                   Reusable interface components
├── lib/                      Rate calculations and formatting helpers
├── shared/
│   ├── api/                  Frankfurter API hooks
│   ├── constants/            Currency and flag metadata
│   └── contexts/             Reducer, context, and persistence
├── App.tsx                   Application shell
├── index.css                 Global styles and design tokens
└── main.tsx                  Providers and React entry point
```

Static icons and currency flags live in `public/assets`, while colocated SCSS and CSS Module files keep component styles scoped. Storybook stories sit beside the reusable components they document.

## Data source

Current and historical exchange rates come from the free [Frankfurter API](https://frankfurter.dev/), which tracks reference rates published by central banks and other official institutions. Because the API is public, the project does not require an account or API key.

## Links

- [Live site](https://currency-converter-omega-dusky.vercel.app/)
- [Source code](https://github.com/Zeeka32/currency-converter)

## Authors

- GitHub: [@Zeeka32](https://github.com/Zeeka32)
- Github: [@Mostafa](https://github.com/Deasoul315)
