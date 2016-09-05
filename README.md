# Shinks App

This is the front-end app for shinks.com.

## Installation

```
npm install
```

Add a file `config/development.js` with the following items:

```
module.exports = {
  api_key: 'your-api-key-goes-here'
};
```

The API key is required to connect to the backend API service. To get an API key, contact me directly.

## Usage

Run `npm start` to see a list of options. These include:

- `serve`: run a local web server on port 8080, to use the app locally. The webserver includes livereload, any changes you make to the app will be reflected in the browser.
- `specs:unit`: run Jasmine unit tests.
- `specs:unit:watch`: watch for filesystem changes and automatically run Jasmine unit tests.
- `specs:intg`: run Karma integration tests.
- `specs:intg:watch`: watch for filesystem changes and automatically run Karma integration tests.
- `specs:e2e`: run Protractor end-to-end tests against the local development server (ensure server is up before running this command).
- `test`: run the full test suite (ensure server is up before running this command).
- `update-webdriver`: updates the Selenium webdriver packages. You need to run this once before running any e2e tests.
- `build`: builds and packages the app and styles into a single bundle.

## Branches

This repo is intended for use as a workshop, demonstrating how to build an Angular 1.5 app using a component-based architecture.

As such, the default branch `start` is the starting point for the workshop. Checking out this repo and running the app will therefore yield the starting point.

The finished product can be found on the `finish` branch, check out this branch to see the final version.

## License

MIT
