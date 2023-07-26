
import { MethodFn, ExtensionBuilder } from "@lukelamey/extensions-typescript/dist";

function helloWorld() {
    const name = 'hello world';

    const requiredMetadata = ['!'];

    async function initialize(metadata: Record<string, string>): Promise<Record<string, string>> {
        let hasRequiredMetadata = true;

        for (let key of requiredMetadata) {
            if (!metadata[key]) {
                hasRequiredMetadata = false;
                break;
            }
        }

        if (!hasRequiredMetadata) {
            throw new Error(`Required metadata not found: ${requiredMetadata}`);
        }

        return metadata;
    }

    type DecodedScalar = {
        value: string | number;
    }

    const sayHello: MethodFn = async function({
        metadata,
        inputs: values
    }) : Promise<DecodedScalar[]> {
        if(values.length !== 1) {
            throw new Error(`Expected 1 argument, got ${values.length}`);
        }

        const name = values[0]?.value.toString();

        if(!name) {
            throw new Error(`Expected string argument, got ${values[0]}`);
        }
        
        return `Hello, ${name}!`;
    }

    function logFunction(l: string) {
        console.log(`log function: ${l}`)
    }

    const server = new ExtensionBuilder()
        .named(name)
        .withInitializer(initialize)
        .withMethods({
            sayHello
        })
        .withLoggerFn(logFunction)
        .port('50051')
        .build();

    process.on('SIGINT', () => {
        server.stop();
    });

    process.on('SIGTERM', () => {
        server.stop();
    });
}

export default helloWorld;