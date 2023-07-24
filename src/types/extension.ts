import { ServerUnaryCall, UntypedServiceImplementation, sendUnaryData } from "@grpc/grpc-js";
import { ExecuteRequest, ExecuteResponse, InitializeRequest, InitializeResponse, ListMethodsRequest, ListMethodsResponse, NameRequest, NameResponse } from "../proto/extension";
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

export interface ExtensionMethodsImpl {
    name(call: ServerUnaryCall<Empty, NameResponse>, callback: sendUnaryData<NameResponse>): void;

    listMethods(call: ServerUnaryCall<ListMethodsRequest, ListMethodsResponse>, callback: sendUnaryData<ListMethodsResponse>): void;

    execute(call: ServerUnaryCall<ExecuteRequest, ExecuteResponse>, callback: sendUnaryData<ExecuteResponse>): void;

    initialize(call: ServerUnaryCall<InitializeRequest, InitializeResponse>, callback: sendUnaryData<InitializeResponse>): void;
}