import { Server } from "@grpc/grpc-js";
import { Nillable, NonNil } from "./general";

export interface ExtensionBuilder {
    withMethods(methods: Record<string, MethodFn>): NonNil<ExtensionBuilder>;

    withInitializer(initializer: InitializeFn): NonNil<ExtensionBuilder>;

    named(name: string): NonNil<ExtensionBuilder>;

    withLoggerFn(logFunction: logFunction): NonNil<ExtensionBuilder>;

    build(): Server;
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

export type MethodFn = (...inputs: ScalarValue[]) => Promise<ScalarValue[]>;

export type logFunction = (l: string) => any;

type ScalarValue = {
    value: string | number;
}