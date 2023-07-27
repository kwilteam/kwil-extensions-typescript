# kwil-extensions-typescript

The Kwil Extensions is a JavaScript/TypeScript SDK for building extensions on the Kwil Network.

Extensions enable developers to run arbitrary applications alongside their database. This allows for implementing business logic, access control, and value accrual mechanisms directly into a decentralized database.

Extensions must be started with the Kwil Daemon. If you need support hosting your Kwil node with an extension, please reach out to us at help@kwil.com.

## Installation
```
npm i @kwil/extensions
```

## Creating Extension

### Building Extensions

The SDK provides an `ExtensionBuilder` class that can be used to configure and build an extension. When building an extension, you must include a name and an object with the methods that can be called in the extension. Optionally, you can include a initializer function, custom logger function, and a port to run the extension server on.

Below are the full list of methods that on the ExtensionBuilder class:

`named(string)`: This required method specifies the name of the extension. Extension names must be a single word or separated by an underscore.

`withInitializer(initializeFunction)`: This optional method takes a function that will be called each time a Kuneiform schema referencing the extension is deployed. It is usually used to set a map containing metadata which is included in each method call in the extension.

`withMethods(Record<string, methodFunction>)`: This required method provides the methods that can be executed by the extension. Each method name is associated with a function. **Method names are case insensitive.**

`withLoggerFunction(loggerFunction)`: This optional method allows you to consume logs from the server. If not specified, logs will be sent to the console.

`withPort(port)`: This optional method allows you to specify the port that the extension server will run on. If not specified, the extension will run on port 50051.

`build()`: This method builds the extension and and returns the server.

`stop()`: This method gracefully stops the extension server.

### Initialize function

An initialize function is a function that allows you to set metadata for the extension. This is useful to allow the kueniform file to receive a variable for a specific database (such as a smart contract address).

The initialize function is called each time a database that uses the extension is deployed. This allows you to have separate instances of an extension for each database.

The initialize function receives a map of strings from the client. The initialize function can modify the passed in map before returning a map of strings to be referenced in the extension methods.

Below is an example of an initialize function that sets a key called `round` to `up` if metadata is not provided:

```typescript
async function initialize(metadata: Record<string, string>): Promise<Record<string, string>> {
    if (!metadata['round']) {
        metadata['round'] = 'up';
    }

    if (metadata['round']!== 'up' || metadata['round'] !== 'down') {
        throw new Error('round must be either up or down');
    }

    return metadata;
}
```

### Extension Methods

Extension methods are functions that can be called from within Kuneiform. All extension methods receive an object with a `metadata` and `inputs` property. The `metadata` property is a map of strings that is passed in from Kuneiform and modified by the [Initialize Function](./js-ts#initialize-function). The `inputs` property is a map of strings that are passed when the method is called from Kuneiform.

Note that inputs are received as an array of Buffers, **so you must convert them to a string or number with .toString() or .toNumber()**.

Extension methods must return a string, number, or an array of strings and numbers.

Below is an example of an extension method that divides two inputs, and rounds based on the metadata received:

```typescript
const divide: MethodFn = async ({ metadata, inputs }) => {
    const x = inputs[0]?.toNumber();
    const y = inputs[1]?.toNumber();

    if(metadata['round'] === 'up') {
        return Math.ceil(x / y);
    } else {
        return Math.floor(x / y);
    }
}
```

### Logger Function

A logger function consumes all logs emitted from the server. If not specificed, the logs will be sent to the console.

Below is an example of a logger function that sends logs to a file:

```typescript
const logger: logFn = (log: string) => {
    fs.appendFileSync('logs.txt', log);
}
```

### Example of Building an Extenstion

Below is an example of how to build a fully functional extension called `math` that provides a method called `divide` that divides two numbers:

```typescript
import { ExtensionBuilder, MethodFn, InitializeFn, logFn } from "@kwil/extensions";
import * as fs from 'fs';

const initialize: InitializeFn = async (metadata: Record<string, string>): Promise<Record<string, string>> => {
    if (!metadata['round']) {
        metadata['round'] = 'up';
    }

    if (metadata['round']!== 'up' && metadata['round'] !== 'down') {
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

const logger: logFn = (log: string) => {
    fs.appendFileSync('logs.txt', log);
}

function startServer(): void {
    const server = new ExtensionBuilder()
        .named('math')
        .withInitializer(initialize)
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
```

### Using the Extension in Kuneiform

With Kuneiform, the Kwil syntax language, you can call and execute extension methods. You can learn more about Kuneiform in our documentation [here](https://docs.kwil.com/docs/kuneiform/introduction). Kuneiform can be written and deployed from our [Web IDE](https://ide.kwil.com/).

To import the extension in Kuneiform, call at the top of the file:

```typescript
use math {
    round: "up"
} as math_extension;
```

To use the `math` extension in an action, call the extension name and method, and assign the result to a variable:

```typescript
action divide_records ($val1, $val2) public {
    $result = math_extension.divide($val1, $val2);
    //rest of action
}
```