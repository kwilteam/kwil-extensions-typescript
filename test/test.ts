import { ExtensionBuilderImpl } from "../src/server/builder";

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

    type ScalarValue = {
        value: string | number;
    }

    async function sayHello(...values: ScalarValue[]) : Promise<ScalarValue[]> {
        if(values.length !== 1) {
            throw new Error(`Expected 1 argument, got ${values.length}`);
        }

        const name = values[0]?.toString();

        if(!name) {
            throw new Error(`Expected string argument, got ${values[0]}`);
        }
        
        return [{ value: `Hello, ${name}!` }];
    }

    function logFunction(l: string) {
        console.log(`log function: ${l}`)
    }

    return new ExtensionBuilderImpl()
        .named(name)
        .withInitializer(initialize)
        .withMethods({
            sayHello
        })
        .withLoggerFn(logFunction)
        .build();
}

helloWorld();