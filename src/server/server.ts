import { Server, ServerCredentials } from "@grpc/grpc-js";
import { ExtensionServiceService, NameRequest, NameResponse } from "../proto/extension";
import { ExtensionTemplate } from "../types/builder";
import { ExtensionMethods } from "./extension";

export function buildServer(config: ExtensionTemplate, port: string): Server {
    const server = new Server();

    server.addService(ExtensionServiceService, new ExtensionMethods());

    server.bindAsync(
        `0.0.0.0:${port}`,
        ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error(err);
                return;
            }
            config.logFn(`gRPC listening on ${port}`, "info");
            server.start();
        }
    )

    return server;
}