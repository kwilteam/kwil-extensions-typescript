import { ExtensionBuilder, MethodFn } from "../../../dist";

type Round = 'up' | 'down';

const name = 'math';

const roundDefault: Round = 'up'

async function initalize(metadata: Record<string, string>): Promise<Record<string, string>> {
    if(!metadata) {
        return { round: roundDefault };
    }

    if(!metadata['round']) {
        metadata['round'] = roundDefault;
    }

    if(metadata['round'] !== 'up' && metadata['round'] !== 'down') {
        throw new Error(`Invalid round value: ${metadata['round']}`);
    }

    return metadata;
}

function round(md: Record<string, string>, x: number): number {
    if(md['round'] === 'up') {
        return Math.ceil(x);
    }

    return Math.floor(x);
}

const add: MethodFn = async ({ metadata, inputs }) => {
    if(inputs.length !== 2) {
        throw new Error(`Expected 2 arguments, got ${inputs.length}`);
    }

    const x = inputs[0]?.toNumber();
    const y = inputs[1]?.toNumber();

    if(x < 3) {
        throw new Error(`Expected x to be greater than 3, got ${x}`);
    }

    if(typeof x !== 'number' || typeof y !== 'number') {
        throw new Error(`Expected number arguments, got ${inputs}`);
    }

    return round(metadata, x + y);
}

const subtract: MethodFn = async ({ metadata, inputs }) => {
    if(inputs.length !== 2) {
        throw new Error(`Expected 2 arguments, got ${inputs.length}`);
    }

    const x = inputs[0]?.toString();
    const y = inputs[1]?.toNumber();

    if(!x || !y) {
        throw new Error(`Expected number arguments, got ${inputs}`);
    }

    return round(metadata, x - y);
}

const multiply: MethodFn = async ({ metadata, inputs }) => {
    if(inputs.length !== 2) {
        throw new Error(`Expected 2 arguments, got ${inputs.length}`);
    }

    const x = inputs[0]?.toNumber();
    const y = inputs[1]?.toNumber();

    if(!x || !y) {
        throw new Error(`Expected number arguments, got ${inputs}`);
    }

    return round(metadata, x * y);
}

const divide: MethodFn = async ({ metadata, inputs }) => {
    if(inputs.length !== 2) {
        throw new Error(`Expected 2 arguments, got ${inputs.length}`);
    }

    const x = inputs[0]?.toNumber();
    const y = inputs[1]?.toNumber();

    if(!x || !y) {
        throw new Error(`Expected number arguments, got ${inputs}`);
    }

    return round(metadata, x / y);
}

function helloMath(): void {
    const server = new ExtensionBuilder()
        .named(name)
        .withInitializer(initalize)
        .withMethods({
            add,
            subtract,
            multiply,
            divide
        })
        .port('50060')
        .build();

    process.on('SIGINT', () => {
        server.stop();
    });

    process.on('SIGTERM', () => {
        server.stop();
    });

    console.log(`version 3`)
}

export default helloMath;