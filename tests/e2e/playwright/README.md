Readme file for the Playwright test suite.

This will outline how the project is setup.

Test plans for sites will be included in seperate readme files within the different folders inside the specs folder.

# Commands for running playwright tests

All commands will need to be ran in the root of the playwright directory.
/TestingPortfolio/tests/e2e/playwright

### Run all tests

npx playwright test

### Run specific spec file

npx playwright test <specName>

### Run tests in headed mode

npx playwright test --headed

### Run tests in ui mode for debugging

npx playwright test --ui
