import { ExtensionBuilder, MethodFn, InitializeFn } from "@lukelamey/extensions-typescript";
import { JsonRpcProvider, Contract} from 'ethers'
import abi from '../abi/registryAbi';
import * as dotenv from 'dotenv';
dotenv.config();

const name = 'addressRegistry';

class RegistryContract {
    private contract: Contract;

    constructor(address: string) {
        const provider = new JsonRpcProvider(process.env.ETH_RPC);
        this.contract = new Contract(address, abi, provider);
    }

    async hasGrant(address: string, id: string): Promise<boolean> {
        const hasGrant = await this.contract['grants_for(address, string)'](address, id);
        return hasGrant.length > 0;
    }
}

const initalize: InitializeFn = async (metadata: Record<string, string>) => {
    if(!metadata['registry_address']) {
        throw new Error(`Extension must be initialized with a registry_address`);
    }

    return metadata;
}

const hasGrant: MethodFn = async ({ metadata, inputs }) => {
    const registry = metadata['registry_address'];

    const contract = new RegistryContract(registry);
    const hasGrant = await contract.hasGrant(inputs[0].toString(), inputs[1].toString());

    if(hasGrant) {
        return "true"
    } else {
        return "false"
    }
}

function helloRegistry(): void {
    const server = new ExtensionBuilder()
    .named(name)
    .withInitializer(initalize)
    .withMethods({ hasGrant })
    .port('50051')
    .build();

    process.on('SIGINT', () => {
        server.stop();
    });

    process.on('SIGTERM', () => {
        server.stop();
    });

    console.log('Registry extension v1 running...')
}

export default helloRegistry;
    