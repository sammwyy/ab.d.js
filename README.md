# AB.d.js - The AdBlocker detector and tester

AB.d.js is a library for detecting ad blockers. It provides methods to perform detection tests using DOM manipulation and script interception.

## Available triggers (Tests)

| Trigger name       | Description                                  | Function name            | Async |
| ------------------ | -------------------------------------------- | ------------------------ | ----- |
| DOM                | Detects ad blockers using DOM manipulation.  | runTestDom               | ✅   |
| Script Interceptor | Detects ad blockers by intercepting scripts. | runTestScriptInterceptor | ✅   |

## Setup

1. **Add compiled script in to your project:**
    Include the dist/ab.d.js file in your HTML and use the available methods to detect ad blockers.

    ```html
    <head>
        <script src="dist/ab.d.js"></script>
    </head>
    ```

2. **Run tests:**

    You can use the method `window.ABD.hasAdBlock(settings)` to run specific tests based on the provided settings in the settings object.

    ```javascript
    // Return the name of the triggered test if adblock is detected
    // Otherwise, returns null.
    const settings = { dom: true, interceptor: true };
    const result = await window.ABD.hasAdBlock(settings);
    console.log(result);
    ```

3. **Run specific tests:**

    You can use the specific test method `window.ABD.runTestXXXX()` to run a specific test.

    ```javascript
     // Returns true if Adblocker is detected
    const domResult = await window.ABD.runTestDom();
    const interceptorResult = await window.ABD.runTestScriptInterceptor();
    console.log(domResult, interceptorResult);
    ```

## Build from sources

```bash
# Clone this project
git clone https://github.com/sammwyy/ab.d.js

# Build using bun
bun install
bun run build

# Build using yarn
yarn add
yarn build

# Build using npm
npm install
npm run build
```

## Contributing

Contributions to the project are welcome. Please open an issue or submit a pull request on the repository if you encounter issues or have suggestions.

## License

This project is licensed under the MIT License.
