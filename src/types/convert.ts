import { ScalarValue } from "../proto/extension";



export class DecodedScaler {
    value: Buffer;

    constructor(initScalar: Buffer) {
        this.value = initScalar;
    }

    public toString(): any {
        const str = this.value.toString('utf-8')
        if(typeof String(str) !== 'string') {
            throw new Error(`Expected string, got ${str}`);
        }
        return String(str);
    }

    public toNumber(): number {
        const byteBuffer = new Uint8Array(this.value);
        let number = 0;
        for(let i = 0; i < byteBuffer.length; i++) {
            number = (number * 256) + byteBuffer[i];
        }
        if(typeof Number(number) !== 'number') {
            throw new Error(`Expected number, got ${number}`);
        }
        number = Number(number);
        return number;
    }
}

interface CleanScalar {
    value: string | number;
}

export function marshalScalar(vals: CleanScalar[]): ScalarValue[] {
    let convertedInputs: ScalarValue[] = []

    for (let v of vals) {
        let x = v.value;
        if(typeof x === 'number') {
            x = x.toString();
        }
        const buffer = Buffer.from(x, 'utf8');
        // const base64 = buffer.toString('base64');
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