### Prerequisites

You need to have ts-node installed on your machine (`npm i -g ts-node`)

### Setup

1. `yarn install` to install dependencies
2. Modify .env.example into .env (this is optional)
3. Modify src/config/index.ts accordingly

### Run

Run `yarn dev` for a hot reload server on port 8080

### Examples

Get a single quote:
http://localhost:8080/quote?instrument_id=EUR&hedger_id=hf_eth_address&batch=false

Get quotes for all available markets:
http://localhost:8080/quote?instrument_id=EUR&hedger_id=hf_eth_address&batch=true
