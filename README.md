## Setup

1. setup and run digital-marketplace-runner
2. `git clone` this repo
3. `cd` into the repo
4. `npm install`
5. `npm test`

If the tests passes,
- try make a change to the home page in buyers frontend.
- Run `npm test` tests should fail and output a diff

If the test fails,
- Run `npm test -- -u` to update the master copy
