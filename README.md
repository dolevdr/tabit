# StarWarsApp

A modern Angular application built with PrimeNG components, featuring Star Wars data display with infinite scrolling, search functionality, and theme switching capabilities.

## Features

- **Starships & Vehicles Display**: Browse Star Wars starships and vehicles with detailed information
- **Infinite Scrolling**: Load more data as you scroll through the listings
- **Search Functionality**: Filter starships and vehicles by name
- **Theme Switching**: Toggle between light and dark themes with persistent storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dialog Details**: View detailed information in modal dialogs
- **State Management**: Uses NgRx Signals for reactive state management

## Tech Stack

- **Angular 19** - Latest Angular framework
- **PrimeNG** - UI component library
- **NgRx Signals** - State management
- **RxJS** - Reactive programming
- **Jest** - Unit testing
- **Playwright** - End-to-end testing
- **BEM CSS** - CSS methodology

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tabit
```

2. Install dependencies:
```bash
npm install
```

## Development

### Start Development Server

Run the development server:
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` (or the port shown in the terminal). The application will automatically reload if you change any of the source files.

### Build

Build the project for production:
```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Build for Production

Build with production optimizations:
```bash
npm run build:prod
# or
ng build --configuration production
```

## Testing

### Unit Tests

Run unit tests with Jest:
```bash
npm test
# or
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

### End-to-End Tests

Run Playwright e2e tests (Chrome only):
```bash
npm run e2e
```

Run e2e tests with UI:
```bash
npm run e2e:ui
```

View e2e test reports:
```bash
npx playwright show-report
```

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── state/
│   │       └── theme.state.ts          # Theme state management
│   │   ├── features/
│   │   │   ├── dashboard/                  # Dashboard component
│   │   │   ├── starship/                   # Starships feature
│   │   │   └── vehicle/                    # Vehicles feature
│   │   └── shared/
│   │       ├── directives/
│   │       │   └── infinite-scroll.directive.ts
│   │       ├── modules/
│   │       │   └── listing-table/          # Reusable table component
│   │       ├── services/
│   │       │   └── star-wars-api.service.ts
│   │       └── types/                      # TypeScript interfaces
│   └── e2e/                               # End-to-end tests
└── styles.scss                        # Global styles
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Build for production
- `npm test` - Run unit tests
- `npm run test:watch` - Run unit tests in watch mode
- `npm run test:coverage` - Run unit tests with coverage
- `npm run e2e` - Run e2e tests
- `npm run e2e:ui` - Run e2e tests with UI

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
