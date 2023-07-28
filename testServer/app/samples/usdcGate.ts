import { Contract, JsonRpcProvider } from "ethers";
import { ExtensionBuilder, InitializeFn, MethodFn } from "kwil-extensions";
import abi from '../abi/usdcAbi'
require('dotenv').config();

const initialize: InitializeFn = async (metadata: Record<string, string>) => {
    if(!metadata['erc_address']) {
        throw new Error(`Extension must be initialized with an erc_address`);
    }

    return metadata;
};

const checkbalance: MethodFn = async ({ metadata, inputs }) => {
    const contractAddress = metadata['erc_address'];

    const provider = new JsonRpcProvider(process.env.ETH_RPC_MAINNET);
    const usdcContract = new Contract(contractAddress, abi, provider);

    const walletAddress = inputs[0].toString();

    const balance = await usdcContract['balanceOf(address)'](walletAddress);
  
    if(BigInt(balance) < BigInt(100 * 1e6)) {
        throw new Error(`Balance too low. Wallet must hold at least 100 USDC. Current balance: ${balance}`);
    }

    return BigInt(balance).toString();
};

function buildServer(): void {
    const server = new ExtensionBuilder()
    .named('erc20gate')
    .withInitializer(initialize)
    .withMethods({ checkbalance })
    .build();

    process.on('SIGINT', () => {
        server.stop();
    });

    process.on('SIGTERM', () => {
        server.stop();
    });
}

export default buildServer;