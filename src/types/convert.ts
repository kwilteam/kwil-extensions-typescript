import { ScalarValue as genNewScalarVal } from "../proto/extension";

interface NewScalarVal {
    value: string | number;
  }

export function convertScalarToPb(vals: NewScalarVal[]): genNewScalarVal[] {
    let convertedOutputs: genNewScalarVal[] = [];
    for (let output of vals) {
        let bts = Buffer.from(JSON.stringify(output.value));
        convertedOutputs.push({ value: bts });
    }
    return convertedOutputs;
}

export function convertScalarFromPb(vals: genNewScalarVal[]): NewScalarVal[] {
    let convertedInputs: NewScalarVal[] = [];
    for (let input of vals) {
        let v = JSON.parse(input.value.toString());
        convertedInputs.push({ value: v });
    }
    return convertedInputs;
}

