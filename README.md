# DexTools Bot

### Getting Started

To get started with this project, follow the instructions below.

#### Prerequisites

Node.js (version v16.18.0 or higher) npm (version 8.19.2 or higher) Installation
Clone the repository:

```
git clone https://github.com/Amcinox/dexTools_bots.git
```

- Install the dependencies:

```
cd dexTools_bots
npm install
```

- Create a .env file in the root directory of the project and add the following
  environment variables:

```
PROCESS_COUNT = 1
THREAD_COUNT = 10 # Number of simulations at one moment
DELAY_BETWEEN_THREADS = 10000 # 10 seconds (The difference between simulations)

RESTART_INTERVAL = 10000 # 10 seconds

IP_INTERVAL = 30000 # 30 seconds
DELAY_BEFORE_CLICK = 3000 # 3 milliseconds

ERC_20_ADDRESS=0x2
PUMBO_URL=https://www.google.com
DEXTOOLS_URL=https://www.dextools.io/

# Proxy Credentials
PROXY_USERNAME=xxxx
PROXY_PASSWORD=xxxx
PROXY_PORT=xxx
```

Make sure to adjust the values as per your requirements.

Usage To run the simulation, execute the following command:

```
npm run dev
```

#### Adding Additional Actions

To incorporate more actions into your project, navigate to the
/src/data/actions.ts file. In this file, you can include your actions as objects
within the provided array. Here's an example:

```
{
  waitForSelector: '.search-mobile-button', // Optionally select an element
  click: '.search-mobile-button', // Optionally click on an element
  log: 'Clicking on the search button', // Optionally log a message after executing the action
  bringToFront: true, // Optional, but necessary if you click on a link and it opens a new tab. Reset to the main tab to continue, unless you want your action to be applied in the new tab.
}
```
