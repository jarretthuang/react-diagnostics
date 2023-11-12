import objectSizeof from "object-sizeof";
function fromConfig(config, reactFC) {
    const shouldRunDiagnostics = config.devModeOnly
        ? process.env.NODE_ENV === "development"
        : true;
    if (!shouldRunDiagnostics) {
        return reactFC;
    }
    else {
        return executeWithDiagnostics(reactFC, config);
    }
}
function executeWithDiagnostics(reactFC, config) {
    function logComponentRendered(functionName) {
        return `Component ${functionName} rendered`;
    }
    function logExecutionTime(startTime, endTime) {
        const executionTime = (endTime - startTime).toFixed(2); // Limit to 2 decimals
        return `Rendering took ${executionTime} milliseconds`;
    }
    function logPropsSize(props) {
        const propsSize = objectSizeof(props);
        return `Size of props: ${propsSize} bytes`;
    }
    return function _(props) {
        const functionName = reactFC.name || "UnknownFunction";
        const startTime = performance.now(); // Start measuring time
        const result = reactFC(props); // Execute the original function
        const endTime = performance.now(); // Stop measuring time
        const logLines = [];
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
function printLogs(logLines) {
    const maxLineLength = Math.max(...logLines.map((line) => line.length));
    const formattedLogLines = logLines.map((line) => `== [Diagnostics] ${line.padEnd(maxLineLength, " ")} ==`);
    const logSeparator = "=".repeat(formattedLogLines[0].length);
    console.log(`${logSeparator}\n${formattedLogLines.join("\n")}\n${logSeparator}`);
}
function simple(reactFC) {
    return fromConfig({
        devModeOnly: true,
        logExecutionTime: true,
        logPropsSize: false,
    }, reactFC);
}
function detailed(reactFC) {
    return fromConfig({
        devModeOnly: true,
        logExecutionTime: true,
        logPropsSize: true,
    }, reactFC);
}
export const withDiagnostics = {
    simple,
    detailed,
    fromConfig,
};
