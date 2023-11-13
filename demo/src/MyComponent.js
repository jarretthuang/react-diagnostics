import { withDiagnostics } from "react-diagnostics-local";
import ChildComponent from "./ChildComponent";

function MyComponent() {
  return (
    <div className="MyComponent">
      <div>react-diagnostics demo</div>
      <ChildComponent name="component-1" />
      <ChildComponent name="component-2" />
    </div>
  );
}

export default withDiagnostics.detailed(MyComponent);
