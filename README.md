### Setup

1. `yarn install` to install dependencies
2. Modify .env.example into .env
3. Modify src/config/index.ts accordingly

### Run

Run `yarn dev` for a hot reload server on port 8000

### Examples

Get a list of hedgers to retrieve hedger_id:
+ https://hedger-balancer.herokuapp.com/v1/info/hedgers

Get a list of markets for a specific hedger_id:
+ https://hedger-balancer.herokuapp.com/v1/info/markets?hedger_id=deusfinance-1

Subscribe to quotes for all available markets for specific hedger_id:
+ ws://hedger-balancer.herokuapp.com/v1/quotes/deusfinance-1
