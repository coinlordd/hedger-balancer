### Prerequisites

You need to have ts-node installed on your machine (`npm i -g ts-node`)

### Setup

1. `yarn install` to install dependencies
2. Modify .env.example into .env
3. Modify src/config/index.ts accordingly

### Run

Run `yarn dev` for a hot reload server on port 8080

### Examples

Get a list of hedgers to retrieve hedger_id:
http://localhost:8080/v1/info/hedgers

Get a list of markets for specific hedger_id:
http://localhost:8080/v1/info/markets?hedger_id={hedger_id}

Subscribe to quotes for all available markets for specific hedger_id:
http://localhost:8080/v1/quotes?hedger_id={hedger_id}
