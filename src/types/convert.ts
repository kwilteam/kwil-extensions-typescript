import { ScalarValue } from "../proto/extension";

interface DecodedScalarImpl {
    value: Buffer;
    toString(): string;
    toNumber(): number;
}

export class DecodedScaler implements DecodedScalarImpl{
    value: Buffer;

    constructor(initScalar: Buffer) {
        this.value = initScalar;
    }

    public toString(): any {
        return JSON.parse(this.value.toString());
    }

    public toNumber(): number {
        const byteBuffer = new Uint8Array(this.value);
        const decoder = new TextDecoder('utf-8');
        const jsonString = decoder.decode(byteBuffer);
        return JSON.parse(jsonString);
    }
}

interface CleanScalar {
    value: string | number;
}

export function marshalScalar(vals: ScalarValue[]): ScalarValue[] {
    let convertedInputs: ScalarValue[] = []

    for (let v of vals) {
        convertedInputs.push({ value: Buffer.from(v.value.toString(), 'base64')})
    }
    return convertedInputs;
}

export function unmarshalPbToScalar(vals: ScalarValue[]): DecodedScaler[] {
    let convertedOutputs: DecodedScaler[] = []

    for (let v of vals) {
        convertedOutputs.push(new DecodedScaler(v.value))
    }
    
    return convertedOutputs
}