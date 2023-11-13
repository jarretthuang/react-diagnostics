import objectSizeof from "object-sizeof";

/**
 * Configuration for the diagnostics.
 */
export type DiagnosticsConfig = {
  devModeOnly: boolean;
  logExecutionTime: boolean;
  logPropsSize: boolean;
};

/**
 * A function that renders a React function component.
 */
type ReactFC = (props: any) => JSX.Element;

export function shouldRunDiagnostics(config: DiagnosticsConfig): boolean {
  return config.devModeOnly ? process.env.NODE_ENV === "development" : true;
}

export function logComponentRendered(functionName: string): string {
  return `Component ${functionName} rendered`;
}

export function logExecutionTime(startTime: number, endTime: number): string {
  const executionTime = (endTime - startTime).toFixed(2); // Limit to 2 decimals
  return `Rendering took ${executionTime} milliseconds`;
}

export function logPropsSize(props: any): string {
  const propsSize = objectSizeof(props);
  return `Size of props: ${propsSize} bytes`;
}

/**
 * Generates an array of log lines based on the provided configuration, function name, start and end times, and props.
 * @param config - The diagnostics configuration object.
 * @param functionName - The name of the function being logged.
 * @param startTime - The start time of the function execution.
 * @param endTime - The end time of the function execution.
 * @param props - The props object being passed to the function.
 * @returns An array of log lines.
 */
export function generateLogs(
  config: DiagnosticsConfig,
  functionName: string,
  startTime: number,
  endTime: number,
  props: any
): string[] {
  const logLines: string[] = [];
  logLines.push(logComponentRendered(functionName));
  if (config.logExecutionTime) {
    logLines.push(logExecutionTime(startTime, endTime));
  }
  if (config.logPropsSize) {
    logLines.push(logPropsSize(props));
  }
  return logLines;
}

function printLogs(logLines: string[]): void {
  const maxLineLength = Math.max(...logLines.map((line) => line.length));
  const formattedLogLines = logLines.map(
    (line) => `== [Diagnostics] ${line.padEnd(maxLineLength, " ")} ==`
  );
  const logSeparator = "=".repeat(formattedLogLines[0].length);
  console.log(
    `${logSeparator}\n${formattedLogLines.join("\n")}\n${logSeparator}`
  );
}

/**
 * Executes a React functional component with diagnostics enabled, if applicable.
 * @param config - The diagnostics configuration object.
 * @param reactFC - The React functional component to execute.
 * @returns A new React functional component that includes diagnostics logging, or the original component if diagnostics are not enabled.
 */
function executeWithConfig(
  config: DiagnosticsConfig,
  reactFC: ReactFC
): ReactFC {
  if (!shouldRunDiagnostics(config)) {
    return reactFC;
  }

  return function _(props: any): JSX.Element {
    const functionName = reactFC.name || "UnknownFunction";
    const startTime = performance.now(); // Start measuring time
    const result = reactFC(props); // Execute the original function
    const endTime = performance.now(); // Stop measuring time

    const logLines = generateLogs(
      config,
      functionName,
      startTime,
      endTime,
      props
    );
    printLogs(logLines);
    return result;
  };
}

function simple(reactFC: ReactFC): ReactFC {
  return executeWithConfig(
    {
      devModeOnly: true,
      logExecutionTime: true,
      logPropsSize: false,
    },
    reactFC
  );
}

function detailed(reactFC: ReactFC): ReactFC {
  return executeWithConfig(
    {
      devModeOnly: true,
      logExecutionTime: true,
      logPropsSize: true,
    },
    reactFC
  );
}

function fromConfig(config: DiagnosticsConfig): (reactFC: ReactFC) => ReactFC {
  return function _(reactFC: ReactFC) {
    return executeWithConfig(config, reactFC);
  };
}

export const withDiagnostics = {
  simple,
  detailed,
  fromConfig,
};
