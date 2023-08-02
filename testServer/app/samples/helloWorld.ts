
import { MethodFn, ExtensionBuilder } from "kwil-extensions";

function helloWorld() {
    const name = 'helloworld';

    const requiredMetadata = ['!'];

    async function initialize(metadata: Record<string, string>): Promise<Record<string, string>> {
        let hasRequiredMetadata = true;

        return metadata;
    }



    const sayHello: MethodFn = async function({
        metadata,
        inputs: values
    }) {
        if(values.length !== 1) {
            throw new Error(`Expected 1 argument, got ${values.length}`);
        }

        const name = values[0]?.value.toString();

        if(!name) {
            throw new Error(`Expected string argument, got ${values[0]}`);
        }
        
        return "Hello, " + name;
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