
export type DiagnosticsConfig = {
    devModeOnly: boolean;
    logExecutionTime: boolean;
    logPropsSize: boolean;
};

function fromConfig(
    config: DiagnosticsConfig,
    reactFC: (props: any) => JSX.Element,
): (props: any) => JSX.Element {
    const shouldRunDiagnostics = config.devModeOnly ? process.env.NODE_ENV === 'development' : true;
    if (!shouldRunDiagnostics) {
        return reactFC;
    } else {
        return executeWithDiagnostics(reactFC, config);
    }
}

function executeWithDiagnostics(
    reactFC: (props: any) => JSX.Element,
    config: DiagnosticsConfig
): (props: any) => JSX.Element {

    function logComponentRendered(functionName: string): string {
        return `Component ${functionName} rendered`;
    }

    function logExecutionTime(startTime: number, endTime: number): string {
        const executionTime = (endTime - startTime).toFixed(2); // Limit to 2 decimals
        return `Rendering took ${executionTime} milliseconds`;
    }

    function logPropsSize(props: any): string {
        const propsSize = JSON.stringify(props).length;
        return `Size of props: ${propsSize} bytes`;
    }

    return function _(props: any): JSX.Element {
        const functionName = reactFC.name || "UnknownFunction";
        const startTime = performance.now();    // Start measuring time
        const result = reactFC(props);          // Execute the original function
        const endTime = performance.now();      // Stop measuring time

        const logLines: string[] = [];
        logLines.push(logComponentRendered(functionName));
        if (config.logExecutionTime) {
            logLines.push(logExecutionTime(startTime, endTime));
        }
        if (config.logPropsSize) {
            logLines.push(logPropsSize(props));
        }
        printLogs(logLines);
        return result;
    };
}

function printLogs(logLines: string[]): void {
    const maxLineLength = Math.max(...logLines.map(line => line.length));
    const formattedLogLines = logLines.map(line => `== [Diagnostics] ${line.padEnd(maxLineLength, ' ')} ==`);
    const logSeparator = '='.repeat(formattedLogLines[0].length);
    console.log(`${logSeparator}\n${formattedLogLines.join('\n')}\n${logSeparator}`);
}

function simple(reactFC: (props: any) => JSX.Element): (props: any) => JSX.Element {
    return fromConfig({
        devModeOnly: true,
        logExecutionTime: true,
        logPropsSize: false,
    }, reactFC);
}

function detailed(reactFC: (props: any) => JSX.Element): (props: any) => JSX.Element {
    return fromConfig({
        devModeOnly: true,
        logExecutionTime: true,
        logPropsSize: true,
    }, reactFC);
}

const withDiagnostics = {
    simple,
    detailed,
    fromConfig,
};

export { simple as default, withDiagnostics };