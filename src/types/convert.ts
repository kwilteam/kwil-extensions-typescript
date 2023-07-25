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
        return this.value.readIntBE(0, this.value.length);
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