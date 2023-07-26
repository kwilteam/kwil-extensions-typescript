import { Server } from "@grpc/grpc-js";
import { ExtensionTemplate, InitializeFn, MethodFn, logFunction, ExtensionBuilderImpl } from "../types/builder";
import { buildServer } from "./server";
import { NonNil } from "../types/general";

export let extConfig: ExtensionTemplate;

export class ExtensionBuilder implements ExtensionBuilderImpl {
    private template: ExtensionTemplate;
    private _port: string = "50051";
    private _server?: Server;

    constructor() {
        this.template = {
            config: {
                name: "",
                initializeFn: async (metadata: Record<string, string>) => { return {} },
                methods: {}
            },
            logFunction: (message, level) => console[level](message)
        }
    }

    withMethods(methods: Record<string, MethodFn>): NonNil<ExtensionBuilderImpl> {
        let cleanedMethods: Record<string, MethodFn> = {};

        for (const k in methods) {
            cleanedMethods[k.toLowerCase()] = methods[k];
        }
        this.template.config.methods = cleanedMethods;
        return this;
    }

    withInitializer(initializer: InitializeFn): NonNil<ExtensionBuilderImpl> {
        this.template.config.initializeFn = initializer;
        return this;
    }

    named(name: string): NonNil<ExtensionBuilderImpl> {
        this.template.config.name = name;
        return this;
    }

    withLoggerFn(logFunction: logFunction): NonNil<ExtensionBuilderImpl> {
        this.template.logFunction = logFunction;
        return this;
    }

    port(port: string): NonNil<ExtensionBuilderImpl> {
        this._port = port;
        return this;
    }

    build(): NonNil<ExtensionBuilderImpl> {
        extConfig = this.template
        this._server = buildServer(this.template, this._port);
        return this;
    }

    stop(): void {
        if (!this._server) {
            throw new Error("Server not started");
        }

        if (this._server) {
            this._server.tryShutdown((err) => {
                this.template.logFunction("Shutting down server", "info")
                process.exit(0);
            })

            // Stop the server from accepting new connections and finishes existing connections.
            setTimeout(() => {
                this.template.logFunction('Could not close connections in time. Forcefully shutting down.' , "error");
                process.exit(1);
            }, 10000);
        }
    }   
}