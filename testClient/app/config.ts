import { JsonRpcProvider, Wallet } from 'ethers';
import { NodeKwil } from 'kwil';
require('dotenv').config();

export const kwil = new NodeKwil({
    kwilProvider: 'http://localhost:8080',
    timeout: 1000,
    logging: false
});

const provider = new JsonRpcProvider(process.env.ETH_PROVIDER)
export const wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);

export interface schemaObj {
    owner: string;
    name: string;
    tables: object[];
    actions: object[];
    extensions: Extensions[];
}

interface Extensions {
    name: string;
    config: MathConfig;
    alias: string;
}

interface MathConfig {
    round: string;
}

export interface RecordTable {
    id: string
    operationtype: string
    param1: number
    param2: number
    finalresponse: number
}
