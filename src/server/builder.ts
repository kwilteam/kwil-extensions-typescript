import { Server } from "@grpc/grpc-js";
import { ExtensionBuilder, ExtensionTemplate, InitializeFn, MethodFn, logFunction } from "../types/builder";
import { buildServer } from "./server";

export class ExtensionBuilderImpl implements ExtensionBuilder {
    private template: ExtensionTemplate;
    
    constructor() {
        this.template = {
            config: {
                name: "",
                initializeFn: async (metadata: Record<string, string>) => { return {} },
                methods: {}
            },
            logFunction: null
        }
    }

    withMethods(methods: Record<string, MethodFn>): ExtensionBuilder {
        this.template.config.methods = methods;
        return this;
    }

    withInitializer(initializer: InitializeFn): ExtensionBuilder {
        this.template.config.initializeFn = initializer;
        return this;
    }

    named(name: string): ExtensionBuilder {
        this.template.config.name = name;
        return this;
    }

    withLoggerFn(logFunction: logFunction): ExtensionBuilder {
        this.template.logFunction = logFunction;
        return this;
    }

    build(): Server {
        return buildServer(this.template);
    }
}