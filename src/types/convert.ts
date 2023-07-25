import { ScalarValue } from "../proto/extension";



export class DecodedScaler {
    value: Buffer;

    constructor(initScalar: Buffer) {
        this.value = initScalar;
    }

    public toString(): any {
        return this.value.toString('utf-8')
    }

    public toNumber(): number {
        const byteBuffer = new Uint8Array(this.value);
        let number = 0;
        for(let i = 0; i < byteBuffer.length; i++) {
            number = (number * 256) + byteBuffer[i];
        }
        return number;
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