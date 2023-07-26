import { CleanScalar, DecodedScaler } from "./convert";
import { Nillable, NonNil } from "./general";


export interface ExtensionBuilderImpl {
    withMethods(methods: Record<string, MethodFn>): NonNil<ExtensionBuilderImpl>;

    withInitializer(initializer: InitializeFn): NonNil<ExtensionBuilderImpl>;

    named(name: string): NonNil<ExtensionBuilderImpl>;

    withLoggerFn(logFunction: logFunction): NonNil<ExtensionBuilderImpl>;

    port(port: string): NonNil<ExtensionBuilderImpl>;

    build(): NonNil<ExtensionBuilderImpl>;

    stop(): void;
}

export interface ExtensionTemplate {
    config: Config,
    logFunction: Nillable<(l: string) => any>
}

interface Config {
    name: string,
    initializeFn: InitializeFn,
    methods: Record<string, MethodFn>
}

export type InitializeFn = (metadata: Record<string, string>) => Promise<Record<string, string>>;

interface MethodFnParams {
    metadata: Record<string, string>,
    inputs: DecodedScaler[]
}

type SingleScalar = string | number;

export type MethodFn = ({
    metadata,
    inputs
}: MethodFnParams) => Promise<SingleScalar[] | SingleScalar>;

export type logFunction = (l: string) => any;