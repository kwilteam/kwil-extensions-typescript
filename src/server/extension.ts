import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { ExecuteRequest, ExecuteResponse, InitializeRequest, InitializeResponse, ListMethodsRequest, ListMethodsResponse, NameRequest, NameResponse } from "../proto/extension";
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { ExtensionTemplate } from "../types/builder";
import { convertScalarFromPb, convertScalarToPb } from "../types/convert";

export function createExtensionMethods(ext: ExtensionTemplate) {
    return {
      Name: (call: ServerUnaryCall<Empty, NameResponse>, callback: sendUnaryData<NameResponse>): void => {
          const reply: NameResponse = { name: ext.config.name };
          callback(null, reply);
      },
  
      ListMethods: (call: ServerUnaryCall<ListMethodsRequest, ListMethodsResponse>, callback: sendUnaryData<ListMethodsResponse>): void => {
          const methods: string[] = Object.keys(ext.config.methods);
          const reply: ListMethodsResponse = { methods };
          callback(null, reply);
      },
  
      Execute: async (call: ServerUnaryCall<ExecuteRequest, ExecuteResponse>, callback: sendUnaryData<ExecuteResponse>): Promise<void> => {
          let method = ext.config.methods[call.request.name];
          if(!method) {
              callback(new Error(`Method ${call.request.name} not found`));
              return;
          }
  
          try {
              const convertedInputs = convertScalarFromPb(call.request.args);
              const outputs = await method(...convertedInputs);
              const convertedOutputs = convertScalarToPb(outputs); 
              const reply: ExecuteResponse = { outputs: convertedOutputs };
              callback(null, reply);
          } catch (error) {
              callback(new Error(`Error executing method ${call.request.name}: ${error}`));
          }
      },
  
      Initialize: async (call: ServerUnaryCall<InitializeRequest, InitializeResponse>, callback: sendUnaryData<InitializeResponse>): Promise<void> => {
          try {
              let metadata = await ext.config.initializeFn(call.request.metadata);
              let reply: InitializeResponse = { 
                  success: true,
                  metadata
               };
              callback(null, reply);
          } catch (error) {
              callback(new Error(`Error initializing extension: ${error}`));
          }
      }
    };
  }
  