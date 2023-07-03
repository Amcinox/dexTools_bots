# DexTools Bot

### Getting Started

To get started with this project, follow the instructions below.

#### Prerequisites

Node.js (version X.X.X or higher) npm (version X.X.X or higher) Installation
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
PROCESS_COUNT=1
THREAD_COUNT=1000
RESTART_INTERVAL=10000
IP_INTERVAL=30000
DELAY_BEFORE_CLICK=3000
DELAY_BETWEEN_THREADS=10000
ERC_20_ADDRESS=0x
PUMBO_URL=https://www.example.com
DEXTOOLS_URL=https://www.dextools.io/
```

Make sure to adjust the values as per your requirements.

Usage To run the simulation, execute the following command:

```
npm run dev
```
