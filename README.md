# React Diagnostics

Enhance your React component development experience with diagnostic logging.

## Installation

```bash
npm install --save-dev react-diagnostics
```

## Usage

#### Simple Diagnostics

Use `withDiagnostics.simple()` for basic diagnostic logging.

```jsx
import withDiagnostics from "react-diagnostics";

const MyComponent = (props) => {
  // Your component logic here
};

export default withDiagnostics.simple(MyComponent);
```

#### Detailed Diagnostics

For more detailed diagnostics, use `withDiagnostics.detailed()`.

```jsx
import withDiagnostics from "react-diagnostics";

const MyComponent = (props) => {
  // Your component logic here
};

export default withDiagnostics.detailed(MyComponent);
```

#### Custom Configuration

Customize the diagnostics behavior with `withDiagnostics.config()`.

```jsx
import withDiagnostics from "react-diagnostics";

const MyComponent = (props) => {
  // Your component logic here
};

const customConfig = {
  logPropsSize: true,
  logExecutionTime: true,
  devModeOnly: true,
};

export default withDiagnostics.config(customConfig)(MyComponent);
```

## Example

Check out the "demo" folder in this repository.
Run `npm start`, and open the console to see the logs in action.

### License

Copyright @[Jarrett Huang](https://github.com/jarretthuang), under the [MIT License](https://github.com/jarretthuang/json-viewer/blob/main/LICENSE).
