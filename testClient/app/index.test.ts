import { RecordTable, checkTransaction, kwil, schemaObj, wallet } from './config';
import mathSchema from './math.kf.json';
import { KwilSigner, Types, Utils } from '@kwilteam/kwil-js';
import { CompiledKuneiform } from '@kwilteam/kwil-js/dist/core/payload';

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('testing database with math extension, round set up', () => {
    afterEach(async () => {
        await sleep(3000);
    });

    const signer = new KwilSigner(wallet, wallet.address);

    test('first deploy database', async () => {
        const deploy: Types.DeployBody = {
            schema: mathSchema,
        }

        const res = await kwil.deploy(deploy, signer);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            tx_hash: expect.any(String),
        });
        
        await checkTransaction(res.data?.tx_hash);
    }, 10000)

    test('add extension function executes', async () => {
        const input = new Utils.ActionInput()
            .put('$id', '1')
            .put('$v1', '3')
            .put('$v2', '4');

        const action: Types.ActionBody = {
            dbid: kwil.getDBID(wallet.address, mathSchema.name),
            action: 'addop',
            inputs: [input]
        }

        const res = await kwil.execute(action, signer);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            tx_hash: expect.any(String),
        });

        await checkTransaction(res.data?.tx_hash);
    }, 10000)

    test('add function returns correct result', async () => {
        const res = await kwil.selectQuery(
            kwil.getDBID(wallet.address, 'testmath'),
            'SELECT * FROM records WHERE id = 1'
        )

        const results = res.data

        console.log(results)

        if(!results) {
            throw new Error('No results returned');
        }

        const record: RecordTable = results[0] as RecordTable;

        console.log(record)

        expect(record.finalresponse).toEqual(7);
    }, 10000)

    test('subtract extension function executes', async () => {
        const input = new Utils.ActionInput()
            .put('$id', '2')
            .put('$v1', '12')
            .put('$v2', '4');

        const payload: Types.ActionBody = {
            dbid: kwil.getDBID(wallet.address, 'testmath'),
            action: 'subop',
            inputs: [input]
        }

        const res = await kwil.execute(payload, signer);


        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            tx_hash: expect.any(String),
        });

        await checkTransaction(res.data?.tx_hash);
    }, 10000)

    test('subtract function returns correct result', async () => {
        const res = await kwil.selectQuery(
            kwil.getDBID(wallet.address, 'testmath'),
            'SELECT * FROM records WHERE id = 2'
        )

        const results = res.data

        if(!results) {
            throw new Error('No results returned');
        }

        const record: RecordTable = results[0] as RecordTable;

        console.log(record)

        expect(record.finalresponse).toEqual(8);
    }, 10000)

    test('multiply extension function executes', async () => {
        const input = new Utils.ActionInput()
            .put('$id', '3')
            .put('$v1', '3')
            .put('$v2', '4');

        const payload: Types.ActionBody = {
            dbid: kwil.getDBID(wallet.address, 'testmath'),
            action: 'multop',
            inputs: [input]
        }

        const res = await kwil.execute(payload, signer);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            tx_hash: expect.any(String),
        });

        await checkTransaction(res.data?.tx_hash);
    }, 10000);

    test('multiply function returns correct result', async () => {
        const res = await kwil.selectQuery(
            kwil.getDBID(wallet.address, 'testmath'),
            'SELECT * FROM records WHERE id = 3'
        )

        const results = res.data

        if(!results) {
            throw new Error('No results returned');
        }

        const record: RecordTable = results[0] as RecordTable;

        console.log(record)

        expect(record.finalresponse).toEqual(12);
    }, 10000)

    test('divide extension function executes', async () => {
        const input = new Utils.ActionInput()
            .put('$id', '4')
            .put('$v1', '9')
            .put('$v2', '4');

        const payload: Types.ActionBody = {
            dbid: kwil.getDBID(wallet.address, 'testmath'),
            action: 'divop',
            inputs: [input]
        }

        const res = await kwil.execute(payload, signer);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            tx_hash: expect.any(String),
        });

        await checkTransaction(res.data?.tx_hash);
    }, 10000);

    test('divide function returns correct result with round up', async () => {
        const res = await kwil.selectQuery(
            kwil.getDBID(wallet.address, 'testmath'),
            'SELECT * FROM records WHERE id = 4'
        )

        const results = res.data

        if(!results) {
            throw new Error('No results returned');
        }

        const record: RecordTable = results[0] as RecordTable;

        console.log(record)

        expect(record.finalresponse).toEqual(3);
    }, 10000);

    test('drop database', async () => {
        const drop: Types.DropBody = {
            dbid: kwil.getDBID(wallet.address, 'testmath'),
        }

        const res = await kwil.drop(drop, signer);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            tx_hash: expect.any(String),
        });

        await checkTransaction(res.data?.tx_hash);
    }, 10000);
})

describe('testing database with math extension, round set down', () => {
    const signer = new KwilSigner(wallet, wallet.address);

    afterEach(async () => {
        await sleep(3000);
    });

    test('first deploy database', async () => {
        type Mutable<T> = {
            -readonly [P in keyof T]: T[P];
          };

        let schema: Mutable<CompiledKuneiform> = mathSchema;
        schema.owner = wallet.address;
        // @ts-ignore
        schema.extensions[0].config[0].value = 'down';

        //@ts-ignore
        console.log(schema.extensions[0].config)

        const deploy: Types.DeployBody = {
            schema
        }

        const res = await kwil.deploy(deploy, signer);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            tx_hash: expect.any(String),
        });

        await checkTransaction(res.data?.tx_hash);
    }, 10000);

    test('divide extension function executes', async () => {
        const input = new Utils.ActionInput()
            .put('$id', '1')
            .put('$v1', '9')
            .put('$v2', '4');

        const payload: Types.ActionBody = {
            dbid: kwil.getDBID(wallet.address, 'testmath'),
            action: 'divop',
            inputs: [input]
        }

        const res = await kwil.execute(payload, signer);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            tx_hash: expect.any(String),
        });

        await checkTransaction(res.data?.tx_hash);
    }, 10000);

    test('divide function returns correct result with round down', async () => {
        const res = await kwil.selectQuery(
            kwil.getDBID(wallet.address, 'testmath'),
            'SELECT * FROM records WHERE id = 1'
        )

        const results = res.data

        if(!results) {
            throw new Error('No results returned');
        }

        const record: RecordTable = results[0] as RecordTable;

        console.log(record)

        expect(record.finalresponse).toEqual(2);
    }, 10000);

    test('drop database', async () => {
        const drop: Types.DropBody = {
            dbid: kwil.getDBID(wallet.address, 'testmath'),
        }

        const res = await kwil.drop(drop, signer);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            tx_hash: expect.any(String),
        });

        await checkTransaction(res.data?.tx_hash);
    }, 10000);
});