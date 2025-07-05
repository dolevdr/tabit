# End-to-End Tests with Playwright

This directory contains comprehensive end-to-end tests for the Star Wars application using Playwright.

## Test Structure

### 1. `app.spec.ts` - Main Application Tests
- **Theme Toggle**: Tests the light/dark mode switching functionality
- **Navigation**: Verifies the app loads with proper routing
- **Dashboard**: Ensures the dashboard loads with tabs for Starships and Vehicles

### 2. `starships.spec.ts` - Starships Feature Tests
- **Data Loading**: Verifies starships data loads from the API
- **Search Functionality**: Tests the search feature with real data
- **Dialog Interactions**: Tests opening and closing detail dialogs
- **Infinite Scroll**: Verifies pagination/infinite scroll functionality
- **Data Display**: Ensures starship information is displayed correctly

### 3. `vehicles.spec.ts` - Vehicles Feature Tests
- **Data Loading**: Verifies vehicles data loads from the API
- **Search Functionality**: Tests the search feature with real data
- **Dialog Interactions**: Tests opening and closing detail dialogs
- **Infinite Scroll**: Verifies pagination/infinite scroll functionality
- **Tab Switching**: Tests navigation between Starships and Vehicles tabs

### 4. `listing-table.spec.ts` - Listing Table Component Tests
- **Table Structure**: Verifies headers and data rows are displayed
- **Search Functionality**: Tests search with various scenarios
- **Row Selection**: Tests clicking on table rows
- **Sorting**: Tests table sorting functionality
- **Empty States**: Tests behavior when no data is found
- **Responsive Design**: Tests table on different screen sizes

### 5. `api-integration.spec.ts` - API Integration Tests
- **Data Loading**: Tests API calls for both starships and vehicles
- **Loading States**: Verifies proper loading indicators
- **Pagination**: Tests infinite scroll and data loading
- **Search Integration**: Tests search with API data
- **Dialog Data**: Tests detail dialog data loading
- **Error Handling**: Tests graceful handling of network issues
- **State Management**: Tests data caching between tab switches

## Running the Tests

### Prerequisites
1. Make sure your Angular development server is running: `npm start`
2. Ensure the application is accessible at `http://localhost:4200`

### Available Commands

```bash
# Run all e2e tests
npm run e2e

# Run tests with UI mode (interactive)
npm run e2e:ui

# Run tests in headed mode (see browser)
npm run e2e:headed

# Run tests in debug mode
npm run e2e:debug

# Show test report
npm run e2e:report
```

### Running Specific Tests

```bash
# Run only app tests
npx playwright test app.spec.ts

# Run only starships tests
npx playwright test starships.spec.ts

# Run tests matching a pattern
npx playwright test --grep "search"

# Run tests in a specific browser
npx playwright test --project=chromium
```

## Test Configuration

The tests are configured in `playwright.config.ts` with the following features:

- **Multiple Browsers**: Tests run on Chromium, Firefox, WebKit, and mobile viewports
- **Parallel Execution**: Tests run in parallel for faster execution
- **Screenshots**: Automatic screenshots on test failures
- **Video Recording**: Video recording on test failures
- **Trace Collection**: Trace files for debugging failed tests
- **Web Server**: Automatic start of development server before tests

## Test Data

The tests use real Star Wars API data from:
- Starships: `https://swapi.dev/api/starships/`
- Vehicles: `https://swapi.dev/api/vehicles/`

## Best Practices

1. **Wait for Elements**: Tests use proper waiting strategies for dynamic content
2. **Realistic Timeouts**: Adequate timeouts for API calls and data loading
3. **Responsive Testing**: Tests run on multiple viewport sizes
4. **Error Handling**: Tests verify graceful handling of edge cases
5. **State Verification**: Tests verify data persistence and caching

## Debugging Failed Tests

1. **Use Debug Mode**: Run `npm run e2e:debug` to step through tests
2. **Check Screenshots**: Failed tests generate screenshots in `test-results/`
3. **View Videos**: Failed tests generate videos in `test-results/`
4. **Trace Files**: Use `npx playwright show-trace` to analyze trace files
5. **UI Mode**: Use `npm run e2e:ui` for interactive debugging

## Continuous Integration

The tests are configured to run in CI environments with:
- Reduced parallelism for CI
- Retry logic for flaky tests
- Proper error reporting
- Artifact collection for debugging

## Maintenance

- Update selectors if component structure changes
- Adjust timeouts based on API response times
- Add new tests for new features
- Review and update test data as needed 