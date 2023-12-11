import { JsonRpcProvider, Wallet } from 'ethers';
import { NodeKwil } from '@kwilteam/kwil-js';
require('dotenv').config();

export const kwil = new NodeKwil({
    kwilProvider: 'http://localhost:8080',
    chainId: "kwil-chain-lQbsETVI",
    timeout: 1000,
    logging: true
});

export const wallet = new Wallet(process.env.PRIVATE_KEY as string);

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

let txQueryTries: number = 0;

export async function checkTransaction(hash?: string): Promise<void> {

    if(!hash) {
        throw new Error('No hash provided');
    }
    const txQuery = await kwil.txInfo(hash);
    console.log(txQuery)

    const log = txQuery.data?.tx_result.log;
    if(log === null) {
        throw new Error("Cannot retrieve log from Kwil Network. Something went wrong with the transaction. Check kwildb logs.")
    }

    if(txQuery.status === 200 && log === 'success') {
        txQueryTries = 0;
        return;
    }

    if(txQuery.status === 200 && log === '') {
        console.log("txQueryTries", txQueryTries)
        txQueryTries++;
        await new Promise(resolve => setTimeout(resolve, 500));
        return checkTransaction(hash);
    }

    if(txQuery.status === 200 && log !== 'success') {
        console.log("should be erroring")
        throw new Error(`Transaction failed: ${log}`);
    }

    if(txQueryTries > 10) {
        throw new Error('Transaction timed out' + log);
    }
}