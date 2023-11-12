import { withDiagnostics } from "react-diagnostics-local";

function MyComponent() {
  return <div className="MyComponent">react-diagnostics demo</div>;
}

export default withDiagnostics.detailed(MyComponent);
