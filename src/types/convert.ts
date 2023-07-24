import { ScalarValue } from "../proto/extension";



export interface DecodedScaler {
    value: string | number
}

export function marshalScalar(vals: DecodedScaler[]): ScalarValue[] {
    let convertedInputs: ScalarValue[] = []

    for (let v of vals) {
        convertedInputs.push({ value: Buffer.from(v.value.toString(), 'base64')})
    }
    return convertedInputs;
}

export function unmarshalPbToScalar(vals: ScalarValue[]): DecodedScaler[] {
    let convertedOutputs: DecodedScaler[] = []

    for (let v of vals) {
        let decoded: DecodedScaler
        decoded = { value: v.value.toString('base64') };
        convertedOutputs.push(decoded)
    }
    
    return convertedOutputs
}