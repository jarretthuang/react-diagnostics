import { withDiagnostics } from "react-diagnostics-local";

function ChildComponent(props) {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  );
}

const diagnosticsConfig = {
  devModeOnly: true,
  logExecutionTime: true,
  logPropsSize: true,
};

export default withDiagnostics.fromConfig(diagnosticsConfig)(ChildComponent);
