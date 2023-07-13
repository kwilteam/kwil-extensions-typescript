/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "extension";

export interface NameRequest {
}

export interface NameResponse {
  name: string;
}

export interface ListMethodsRequest {
}

export interface ListMethodsResponse {
  methods: string[];
}

export interface InitializeRequest {
  /** maps the name to the value */
  metadata: { [key: string]: string };
}

export interface InitializeRequest_MetadataEntry {
  key: string;
  value: string;
}

export interface InitializeResponse {
  success: boolean;
  metadata: { [key: string]: string };
}

export interface InitializeResponse_MetadataEntry {
  key: string;
  value: string;
}

export interface ExecuteRequest {
  name: string;
  args: ScalarValue[];
  /** maps the name to the value */
  metadata: { [key: string]: string };
}

export interface ExecuteRequest_MetadataEntry {
  key: string;
  value: string;
}

export interface ExecuteResponse {
  outputs: ScalarValue[];
}

/** ScalarValue is used to represent a scalar value. */
export interface ScalarValue {
  value: Buffer;
}

function createBaseNameRequest(): NameRequest {
  return {};
}

export const NameRequest = {
  encode(_: NameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NameRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): NameRequest {
    return {};
  },

  toJSON(_: NameRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<NameRequest>, I>>(base?: I): NameRequest {
    return NameRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NameRequest>, I>>(_: I): NameRequest {
    const message = createBaseNameRequest();
    return message;
  },
};

function createBaseNameResponse(): NameResponse {
  return { name: "" };
}

export const NameResponse = {
  encode(message: NameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NameResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NameResponse {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: NameResponse): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  create<I extends Exact<DeepPartial<NameResponse>, I>>(base?: I): NameResponse {
    return NameResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NameResponse>, I>>(object: I): NameResponse {
    const message = createBaseNameResponse();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseListMethodsRequest(): ListMethodsRequest {
  return {};
}

export const ListMethodsRequest = {
  encode(_: ListMethodsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMethodsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMethodsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ListMethodsRequest {
    return {};
  },

  toJSON(_: ListMethodsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMethodsRequest>, I>>(base?: I): ListMethodsRequest {
    return ListMethodsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListMethodsRequest>, I>>(_: I): ListMethodsRequest {
    const message = createBaseListMethodsRequest();
    return message;
  },
};

function createBaseListMethodsResponse(): ListMethodsResponse {
  return { methods: [] };
}

export const ListMethodsResponse = {
  encode(message: ListMethodsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.methods) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMethodsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMethodsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.methods.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListMethodsResponse {
    return { methods: Array.isArray(object?.methods) ? object.methods.map((e: any) => String(e)) : [] };
  },

  toJSON(message: ListMethodsResponse): unknown {
    const obj: any = {};
    if (message.methods) {
      obj.methods = message.methods.map((e) => e);
    } else {
      obj.methods = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListMethodsResponse>, I>>(base?: I): ListMethodsResponse {
    return ListMethodsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListMethodsResponse>, I>>(object: I): ListMethodsResponse {
    const message = createBaseListMethodsResponse();
    message.methods = object.methods?.map((e) => e) || [];
    return message;
  },
};

function createBaseInitializeRequest(): InitializeRequest {
  return { metadata: {} };
}

export const InitializeRequest = {
  encode(message: InitializeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.metadata).forEach(([key, value]) => {
      InitializeRequest_MetadataEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InitializeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInitializeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = InitializeRequest_MetadataEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.metadata[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InitializeRequest {
    return {
      metadata: isObject(object.metadata)
        ? Object.entries(object.metadata).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: InitializeRequest): unknown {
    const obj: any = {};
    obj.metadata = {};
    if (message.metadata) {
      Object.entries(message.metadata).forEach(([k, v]) => {
        obj.metadata[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InitializeRequest>, I>>(base?: I): InitializeRequest {
    return InitializeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<InitializeRequest>, I>>(object: I): InitializeRequest {
    const message = createBaseInitializeRequest();
    message.metadata = Object.entries(object.metadata ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseInitializeRequest_MetadataEntry(): InitializeRequest_MetadataEntry {
  return { key: "", value: "" };
}

export const InitializeRequest_MetadataEntry = {
  encode(message: InitializeRequest_MetadataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InitializeRequest_MetadataEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInitializeRequest_MetadataEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InitializeRequest_MetadataEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: InitializeRequest_MetadataEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<InitializeRequest_MetadataEntry>, I>>(base?: I): InitializeRequest_MetadataEntry {
    return InitializeRequest_MetadataEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<InitializeRequest_MetadataEntry>, I>>(
    object: I,
  ): InitializeRequest_MetadataEntry {
    const message = createBaseInitializeRequest_MetadataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseInitializeResponse(): InitializeResponse {
  return { success: false, metadata: {} };
}

export const InitializeResponse = {
  encode(message: InitializeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    Object.entries(message.metadata).forEach(([key, value]) => {
      InitializeResponse_MetadataEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InitializeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInitializeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = InitializeResponse_MetadataEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.metadata[entry2.key] = entry2.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InitializeResponse {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      metadata: isObject(object.metadata)
        ? Object.entries(object.metadata).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: InitializeResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    obj.metadata = {};
    if (message.metadata) {
      Object.entries(message.metadata).forEach(([k, v]) => {
        obj.metadata[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InitializeResponse>, I>>(base?: I): InitializeResponse {
    return InitializeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<InitializeResponse>, I>>(object: I): InitializeResponse {
    const message = createBaseInitializeResponse();
    message.success = object.success ?? false;
    message.metadata = Object.entries(object.metadata ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseInitializeResponse_MetadataEntry(): InitializeResponse_MetadataEntry {
  return { key: "", value: "" };
}

export const InitializeResponse_MetadataEntry = {
  encode(message: InitializeResponse_MetadataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InitializeResponse_MetadataEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInitializeResponse_MetadataEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InitializeResponse_MetadataEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: InitializeResponse_MetadataEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<InitializeResponse_MetadataEntry>, I>>(
    base?: I,
  ): InitializeResponse_MetadataEntry {
    return InitializeResponse_MetadataEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<InitializeResponse_MetadataEntry>, I>>(
    object: I,
  ): InitializeResponse_MetadataEntry {
    const message = createBaseInitializeResponse_MetadataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseExecuteRequest(): ExecuteRequest {
  return { name: "", args: [], metadata: {} };
}

export const ExecuteRequest = {
  encode(message: ExecuteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.args) {
      ScalarValue.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    Object.entries(message.metadata).forEach(([key, value]) => {
      ExecuteRequest_MetadataEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.args.push(ScalarValue.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = ExecuteRequest_MetadataEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.metadata[entry3.key] = entry3.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      args: Array.isArray(object?.args) ? object.args.map((e: any) => ScalarValue.fromJSON(e)) : [],
      metadata: isObject(object.metadata)
        ? Object.entries(object.metadata).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ExecuteRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.args) {
      obj.args = message.args.map((e) => e ? ScalarValue.toJSON(e) : undefined);
    } else {
      obj.args = [];
    }
    obj.metadata = {};
    if (message.metadata) {
      Object.entries(message.metadata).forEach(([k, v]) => {
        obj.metadata[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteRequest>, I>>(base?: I): ExecuteRequest {
    return ExecuteRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteRequest>, I>>(object: I): ExecuteRequest {
    const message = createBaseExecuteRequest();
    message.name = object.name ?? "";
    message.args = object.args?.map((e) => ScalarValue.fromPartial(e)) || [];
    message.metadata = Object.entries(object.metadata ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseExecuteRequest_MetadataEntry(): ExecuteRequest_MetadataEntry {
  return { key: "", value: "" };
}

export const ExecuteRequest_MetadataEntry = {
  encode(message: ExecuteRequest_MetadataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteRequest_MetadataEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteRequest_MetadataEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteRequest_MetadataEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: ExecuteRequest_MetadataEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteRequest_MetadataEntry>, I>>(base?: I): ExecuteRequest_MetadataEntry {
    return ExecuteRequest_MetadataEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteRequest_MetadataEntry>, I>>(object: I): ExecuteRequest_MetadataEntry {
    const message = createBaseExecuteRequest_MetadataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseExecuteResponse(): ExecuteResponse {
  return { outputs: [] };
}

export const ExecuteResponse = {
  encode(message: ExecuteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.outputs) {
      ScalarValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.outputs.push(ScalarValue.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteResponse {
    return { outputs: Array.isArray(object?.outputs) ? object.outputs.map((e: any) => ScalarValue.fromJSON(e)) : [] };
  },

  toJSON(message: ExecuteResponse): unknown {
    const obj: any = {};
    if (message.outputs) {
      obj.outputs = message.outputs.map((e) => e ? ScalarValue.toJSON(e) : undefined);
    } else {
      obj.outputs = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteResponse>, I>>(base?: I): ExecuteResponse {
    return ExecuteResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteResponse>, I>>(object: I): ExecuteResponse {
    const message = createBaseExecuteResponse();
    message.outputs = object.outputs?.map((e) => ScalarValue.fromPartial(e)) || [];
    return message;
  },
};

function createBaseScalarValue(): ScalarValue {
  return { value: Buffer.alloc(0) };
}

export const ScalarValue = {
  encode(message: ScalarValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value.length !== 0) {
      writer.uint32(10).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScalarValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScalarValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = reader.bytes() as Buffer;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScalarValue {
    return { value: isSet(object.value) ? Buffer.from(bytesFromBase64(object.value)) : Buffer.alloc(0) };
  },

  toJSON(message: ScalarValue): unknown {
    const obj: any = {};
    message.value !== undefined &&
      (obj.value = base64FromBytes(message.value !== undefined ? message.value : Buffer.alloc(0)));
    return obj;
  },

  create<I extends Exact<DeepPartial<ScalarValue>, I>>(base?: I): ScalarValue {
    return ScalarValue.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ScalarValue>, I>>(object: I): ScalarValue {
    const message = createBaseScalarValue();
    message.value = object.value ?? Buffer.alloc(0);
    return message;
  },
};

export type ExtensionServiceService = typeof ExtensionServiceService;
export const ExtensionServiceService = {
  /** Name is used to get the name of the extension. */
  name: {
    path: "/extension.ExtensionService/Name",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: NameRequest) => Buffer.from(NameRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => NameRequest.decode(value),
    responseSerialize: (value: NameResponse) => Buffer.from(NameResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => NameResponse.decode(value),
  },
  /** ListMethods is used to list the methods which the extension provides. */
  listMethods: {
    path: "/extension.ExtensionService/ListMethods",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListMethodsRequest) => Buffer.from(ListMethodsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListMethodsRequest.decode(value),
    responseSerialize: (value: ListMethodsResponse) => Buffer.from(ListMethodsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListMethodsResponse.decode(value),
  },
  /** Execute is used to execute a method provided by the extension. */
  execute: {
    path: "/extension.ExtensionService/Execute",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ExecuteRequest) => Buffer.from(ExecuteRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ExecuteRequest.decode(value),
    responseSerialize: (value: ExecuteResponse) => Buffer.from(ExecuteResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ExecuteResponse.decode(value),
  },
  /** Initialize is used to create a new extension instance */
  initialize: {
    path: "/extension.ExtensionService/Initialize",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: InitializeRequest) => Buffer.from(InitializeRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => InitializeRequest.decode(value),
    responseSerialize: (value: InitializeResponse) => Buffer.from(InitializeResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => InitializeResponse.decode(value),
  },
} as const;

export interface ExtensionServiceServer extends UntypedServiceImplementation {
  /** Name is used to get the name of the extension. */
  name: handleUnaryCall<NameRequest, NameResponse>;
  /** ListMethods is used to list the methods which the extension provides. */
  listMethods: handleUnaryCall<ListMethodsRequest, ListMethodsResponse>;
  /** Execute is used to execute a method provided by the extension. */
  execute: handleUnaryCall<ExecuteRequest, ExecuteResponse>;
  /** Initialize is used to create a new extension instance */
  initialize: handleUnaryCall<InitializeRequest, InitializeResponse>;
}

export interface ExtensionServiceClient extends Client {
  /** Name is used to get the name of the extension. */
  name(request: NameRequest, callback: (error: ServiceError | null, response: NameResponse) => void): ClientUnaryCall;
  name(
    request: NameRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: NameResponse) => void,
  ): ClientUnaryCall;
  name(
    request: NameRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: NameResponse) => void,
  ): ClientUnaryCall;
  /** ListMethods is used to list the methods which the extension provides. */
  listMethods(
    request: ListMethodsRequest,
    callback: (error: ServiceError | null, response: ListMethodsResponse) => void,
  ): ClientUnaryCall;
  listMethods(
    request: ListMethodsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListMethodsResponse) => void,
  ): ClientUnaryCall;
  listMethods(
    request: ListMethodsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListMethodsResponse) => void,
  ): ClientUnaryCall;
  /** Execute is used to execute a method provided by the extension. */
  execute(
    request: ExecuteRequest,
    callback: (error: ServiceError | null, response: ExecuteResponse) => void,
  ): ClientUnaryCall;
  execute(
    request: ExecuteRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ExecuteResponse) => void,
  ): ClientUnaryCall;
  execute(
    request: ExecuteRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ExecuteResponse) => void,
  ): ClientUnaryCall;
  /** Initialize is used to create a new extension instance */
  initialize(
    request: InitializeRequest,
    callback: (error: ServiceError | null, response: InitializeResponse) => void,
  ): ClientUnaryCall;
  initialize(
    request: InitializeRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: InitializeResponse) => void,
  ): ClientUnaryCall;
  initialize(
    request: InitializeRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: InitializeResponse) => void,
  ): ClientUnaryCall;
}

export const ExtensionServiceClient = makeGenericClientConstructor(
  ExtensionServiceService,
  "extension.ExtensionService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): ExtensionServiceClient;
  service: typeof ExtensionServiceService;
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
