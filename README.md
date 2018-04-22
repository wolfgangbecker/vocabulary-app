# vocabulary-app

> This is a simple web app to learn vocabulary in a foreign language. <br>It is built with [Vue.js](https://vuejs.org/) + [Vuex](https://vuex.vuejs.org/en/intro.html) (front-end) and [LoopBack](https://loopback.io/) (back-end).

## Installation

1. Install [Node](https://nodejs.org/en/).
2. Run `npm install` in the root project directory.
3. `cd` into api-server/ and run `npm install` again.

> You can also use `yarn` for both installations.

## Run it

1. In the root directory run `npm run dev` (or just `yarn dev`).
> This will start the Webpack dev server on localhost:8080 (unless you have something else running there).
2. Head into the api-server/ directory and run `node .`.
> This starts an [ExpressJS](https://expressjs.com/)-based API server on localhost:3000.
3. Now just enter the URL for the frontend server in the browser.

## Test

Execute `npm run test` (or `yarn test`) to run all tests and create a coverage report.<br>
The report can be found at test/unit/coverage/lcov-report/index.html
