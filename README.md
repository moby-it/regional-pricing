# Moby IT Regional Pricing

Server-side application which receives location (latitude, longitude),
determines the corresponding country and returns the pricing

## Testing Naming conventions

To create new tests, there's a naming convention to keep in mind. Since we use node test runner, we have some restrictions on how to use regex when matching test names. So currently: any test that's a **unit test should be named `*.unit.test.mjs` **.
Integration tests (the ones meant to run in docker) should be named ** `*.integration.test.mjs` **