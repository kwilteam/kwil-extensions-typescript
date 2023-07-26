import { RecordTable, kwil, schemaObj, wallet } from './config';
import mathSchema from './testmath.kf.json';
import { Types, Utils } from 'kwil';

describe('testing database with math extension, round set up', () => {

    test('first deploy database', async () => {
        let schema: schemaObj = mathSchema;
        schema.owner = wallet.address;

        const dbTx: Types.Transaction = await kwil.dbBuilder()
            .signer(wallet)
            .payload(schema)
            .buildTx();
        
        const res = await kwil.broadcast(dbTx);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            txHash: expect.any(String),
            fee: expect.any(String),
            body: null,
        });
    })

    test('add extension function executes', async () => {
        const input = new Utils.ActionInput()
            .put('$id', '1')
            .put('$v1', '3')
            .put('$v2', '4');

        const tx: Types.Transaction = await kwil.actionBuilder()
            .name('addop')
            .dbid(kwil.getDBID(wallet.address, 'testmath'))
            .signer(wallet)
            .concat(input)
            .buildTx();

        const res = await kwil.broadcast(tx);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            txHash: expect.any(String),
            fee: expect.any(String),
            body: expect.any(Array),
        });
    })

    test('add function returns correct result', async () => {
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

        expect(record.finalresponse).toEqual(7);
    })

    test('subtract extension function executes', async () => {
        const input = new Utils.ActionInput()
            .put('$id', '2')
            .put('$v1', '12')
            .put('$v2', '4');

        const tx: Types.Transaction = await kwil.actionBuilder()
            .name('subop')
            .dbid(kwil.getDBID(wallet.address, 'testmath'))
            .signer(wallet)
            .concat(input)
            .buildTx();

        const res = await kwil.broadcast(tx);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            txHash: expect.any(String),
            fee: expect.any(String),
            body: expect.any(Array),
        });
    })

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
    })

    test('multiply extension function executes', async () => {
        const input = new Utils.ActionInput()
            .put('$id', '3')
            .put('$v1', '3')
            .put('$v2', '4');

        const tx: Types.Transaction = await kwil.actionBuilder()
            .name('multop')
            .dbid(kwil.getDBID(wallet.address, 'testmath'))
            .signer(wallet)
            .concat(input)
            .buildTx();

        const res = await kwil.broadcast(tx);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            txHash: expect.any(String),
            fee: expect.any(String),
            body: expect.any(Array),
        });
    });

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
    })

    test('divide extension function executes', async () => {
        const input = new Utils.ActionInput()
            .put('$id', '4')
            .put('$v1', '9')
            .put('$v2', '4');

        const tx: Types.Transaction = await kwil.actionBuilder()
            .name('divop')
            .dbid(kwil.getDBID(wallet.address, 'testmath'))
            .signer(wallet)
            .concat(input)
            .buildTx();

        const res = await kwil.broadcast(tx);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            txHash: expect.any(String),
            fee: expect.any(String),
            body: expect.any(Array),
        });
    });

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
    });

    test('drop database', async () => {
        const tx: Types.Transaction = await kwil.dropDBBuilder()
            .payload({
                owner: wallet.address,
                name: 'testmath'
            })
            .signer(wallet)
            .buildTx();

        const res = await kwil.broadcast(tx);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            txHash: expect.any(String),
            fee: expect.any(String),
            body: null,
        });
    });
})

describe('testing database with math extension, round set down', () => {
    test('first deploy database', async () => {
        let schema: schemaObj = mathSchema;
        schema.owner = wallet.address;
        schema.extensions[0].config.round = "\"down\"";

        const dbTx: Types.Transaction = await kwil.dbBuilder()
            .signer(wallet)
            .payload(schema)
            .buildTx();
        
        const res = await kwil.broadcast(dbTx);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            txHash: expect.any(String),
            fee: expect.any(String),
            body: null,
        });
    });

    test('divide extension function executes', async () => {
        const input = new Utils.ActionInput()
            .put('$id', '1')
            .put('$v1', '9')
            .put('$v2', '4');

        const tx: Types.Transaction = await kwil.actionBuilder()
            .name('divop')
            .dbid(kwil.getDBID(wallet.address, 'testmath'))
            .signer(wallet)
            .concat(input)
            .buildTx();

        const res = await kwil.broadcast(tx);

        expect(res.data).toBeDefined();
        expect(res.data).toMatchObject<Types.TxReceipt>({
            txHash: expect.any(String),
            fee: expect.any(String),
            body: expect.any(Array),
        });
    });

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
    });
});