import { ExtensionBuilder, MethodFn, InitializeFn, logFn } from "@lukelamey/extensions-typescript";
import * as fs from 'fs';

const initialize: InitializeFn = async (metadata: Record<string, string>): Promise<Record<string, string>> {
    if (!metadata['round']) {
        metadata['round'] = 'up';
    }

    if (metadata['round']!== 'up'  || metadata['round'] !== 'down') {
        throw new Error('round must be either up or down');
    }

    return metadata;
}

const divide: MethodFn = async ({ metadata, inputs }) => {
    const x = inputs[0]?.toNumber();
    const y = inputs[1]?.toNumber();

    if(metadata['round'] === 'up') {
        return Math.ceil(x / y);
    } else {
        return Math.floor(x / y);
    }
}

const logger: LoggerFn = (log) => {
    fs.appendFileSync('logs.txt', log);
}

function startServer(): void {
    const server = new ExtensionBuilder()
        .named('math')
        .withInitializer(initalize)
        .withMethods({
            divide
        })
        .withLoggerFn(logger)
        .port('50051')
        .build();

    process.on('SIGINT', () => {
        server.stop();
    });

    process.on('SIGTERM', () => {
        server.stop();
    });
}

startServer();