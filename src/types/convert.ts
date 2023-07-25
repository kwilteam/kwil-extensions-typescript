import { ScalarValue } from "../proto/extension";



export class DecodedScaler {
    value: Buffer;

    constructor(initScalar: Buffer) {
        this.value = initScalar;
    }

    public toString(): any {
        const str = this.value.toString('utf-8')
        if(typeof str !== 'string') {
            throw new Error(`Expected string, got ${str}`);
        }
        return str;
    }

    public toNumber(): number {
        console.log(`buffer: ${this.value}`)
        const str = this.toString();
        console.log(`str: ${str}`)

        for(let i = 0; i < str.length; i++) {
            console.log(`str[${i}] = '${str[i]}' (code: ${str.charCodeAt(i)})`);
        }

        const number = Number(str.trim());
        console.log(`number: ${number}`)
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