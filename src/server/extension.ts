import { ServerUnaryCall, UntypedHandleCall, sendUnaryData } from "@grpc/grpc-js";
import { ExecuteRequest, ExecuteResponse, InitializeRequest, InitializeResponse, ListMethodsRequest, ListMethodsResponse, NameRequest, NameResponse } from "../proto/extension";
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { marshalScalar, unmarshalPbToScalar } from "../types/convert";
import { ExtensionMethodsImpl } from "../types/extension";
import { extConfig } from "./builder";

class MetadataStore {
    private _metadata: Record<string, string>;

    constructor() {
        this._metadata = {};
    }  
  
    public get metadata(): Record<string, string> {
      return this._metadata;
    }
  
    public set metadata(value: Record<string, string>) {
      this._metadata = value;
    }
}

const metadataStore = new MetadataStore();

export class ExtensionMethods implements ExtensionMethodsImpl {
    [method: string]: UntypedHandleCall;

    public name(call: ServerUnaryCall<Empty, NameResponse>, callback: sendUnaryData<NameResponse>): void {
        const reply: NameResponse = { name: extConfig.config.name };
        callback(null, reply);
    }

    public listMethods(call: ServerUnaryCall<ListMethodsRequest, ListMethodsResponse>, callback: sendUnaryData<ListMethodsResponse>): void {
        const methods: string[] = Object.keys(extConfig.config.methods);
        const reply: ListMethodsResponse = { methods };
        callback(null, reply);
    }

    public async execute(call: ServerUnaryCall<ExecuteRequest, ExecuteResponse>, callback: sendUnaryData<ExecuteResponse>): Promise<void> {
        let method = extConfig.config.methods[call.request.name];

        if(!method) {
            callback(new Error(`Method ${call.request.name} not found`));
            return;
        }

        try {
            console.log(`args: ${call.request.args}`)
            const convertedInputs = unmarshalPbToScalar(call.request.args);
            console.log(`convertedInputs: ${
                convertedInputs.map((x) => {
                    return x.toString();
                })
            }`)
            console.log(typeof convertedInputs)
            const outputs = await method({ inputs: convertedInputs, metadata: metadataStore.metadata });
            console.log(`outputs: ${outputs}`)
            const convertedOutputs = marshalScalar(outputs);
            console.log(`convertedOutputs: ${convertedOutputs}`)
            const reply: ExecuteResponse = { outputs: convertedOutputs };
            callback(null, reply);
        } catch (error) {
            callback(new Error(`Error executing method ${call.request.name}: ${error}`));
        }
    }

    public async initialize(call: ServerUnaryCall<InitializeRequest, InitializeResponse>, callback: sendUnaryData<InitializeResponse>): Promise<void> {
        try {
            let metadata = await extConfig.config.initializeFn(call.request.metadata);
            let reply: InitializeResponse = { 
                success: true,
                metadata
             };
             console.log(reply)
            metadataStore.metadata = metadata;
            callback(null, reply);
        } catch (error) {
            callback(new Error(`Error initializing extension: ${error}`));
        }
    }

}