/// <reference types="react" />
export type DiagnosticsConfig = {
    devModeOnly: boolean;
    logExecutionTime: boolean;
    logPropsSize: boolean;
};
declare function fromConfig(config: DiagnosticsConfig, reactFC: (props: any) => JSX.Element): (props: any) => JSX.Element;
declare function simple(reactFC: (props: any) => JSX.Element): (props: any) => JSX.Element;
declare function detailed(reactFC: (props: any) => JSX.Element): (props: any) => JSX.Element;
export declare const withDiagnostics: {
    simple: typeof simple;
    detailed: typeof detailed;
    fromConfig: typeof fromConfig;
};
export {};
