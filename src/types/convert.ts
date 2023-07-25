import { ScalarValue } from "../proto/extension";



export class DecodedScaler {
    value: Buffer;

    constructor(initScalar: Buffer) {
        this.value = initScalar;
    }

    public toString(): any {
        return JSON.parse(this.value.toString());
    }

    public toNumber(): number {
        const byteBuffer = new Uint8Array(this.value);
        console.log(`byteBuffer: ${byteBuffer}`)
        const decoder = new TextDecoder('utf-8');
        console.log(`decoder: ${decoder}`)
        const jsonString = decoder.decode(byteBuffer);
        console.log(`jsonString: ${JSON.parse(jsonString)}`)
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