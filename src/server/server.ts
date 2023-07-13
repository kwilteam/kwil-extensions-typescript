import { Server, ServerCredentials } from "@grpc/grpc-js";
import { ExtensionServiceService, NameRequest, NameResponse } from "../proto/extension";
import { ExtensionTemplate } from "../types/builder";
import { createExtensionMethods } from "./extension";

export function buildServer(config: ExtensionTemplate): Server {
    const extensionMethods = createExtensionMethods(config);

    const server = new Server();

    server.addService(ExtensionServiceService, extensionMethods)

    server.bindAsync(
        'localhost:50051',
        ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`gRPC listening on ${port}`);
        }
    )

    return server;
}

export function stopServer(server: Server): void {
    server.forceShutdown();
}

