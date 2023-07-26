import { ScalarValue } from "../proto/extension";

export class DecodedScaler {
    value: Buffer;

    constructor(initScalar: Buffer) {
        this.value = initScalar;
    }

    public toString(): any {
        let str = this.value.toString('utf-8')
        str = JSON.parse(str);
        if(typeof str !== 'string') {
            throw new Error(`Expected string, got ${str}`);
        }
        return str;
    }

    public toNumber(): number {
        const str = this.toString();
        const number = Number(str);
        return number;
    }
}

export interface CleanScalar {
    value: string | number;
}

export function marshalScalar(vals: CleanScalar[]): ScalarValue[] {
    let convertedInputs: ScalarValue[] = []

    for (let v of vals) {
        let x = v.value;
        if(typeof x === 'number') {
            x = x.toString();
        }
        console.log(`marshal x: ${x}`)
        const buffer = Buffer.from(x, 'utf-8');
        console.log(`buffer: ${buffer}`)
        convertedInputs.push({ value: buffer });
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