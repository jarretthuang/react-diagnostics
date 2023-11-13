import {
  DiagnosticsConfig,
  shouldRunDiagnostics,
  logComponentRendered,
  logExecutionTime,
  logPropsSize,
  generateLogs,
} from "../withDiagnostics";

describe("shouldRunDiagnostics", () => {
  it("should return true if devModeOnly is false", () => {
    const config: DiagnosticsConfig = {
      devModeOnly: false,
      logExecutionTime: false,
      logPropsSize: false,
    };
    expect(shouldRunDiagnostics(config)).toBe(true);
  });
});

describe("logComponentRendered", () => {
  it("should return a string indicating the component rendered", () => {
    expect(logComponentRendered("TestComponent")).toBe(
      "Component TestComponent rendered"
    );
  });
});

describe("logExecutionTime", () => {
  it("should return a string indicating the execution time", () => {
    const startTime = 1000;
    const endTime = 2000;
    expect(logExecutionTime(startTime, endTime)).toBe(
      "Rendering took 1000.00 milliseconds"
    );
  });
});

describe("logPropsSize", () => {
  it("should return a string indicating the size of the props", () => {
    const props = { key: "value" };
    expect(logPropsSize(props)).toBe("Size of props: 15 bytes");
  });
});

describe("generateLogs", () => {
  it("should generate the correct log lines based on the config", () => {
    const config: DiagnosticsConfig = {
      devModeOnly: false,
      logExecutionTime: true,
      logPropsSize: true,
    };
    const functionName = "TestComponent";
    const startTime = 1000;
    const endTime = 2000;
    const props = { key: "value" };
    const expectedLogs = [
      "Component TestComponent rendered",
      "Rendering took 1000.00 milliseconds",
      "Size of props: 15 bytes",
    ];
    expect(
      generateLogs(config, functionName, startTime, endTime, props)
    ).toEqual(expectedLogs);
  });
});
