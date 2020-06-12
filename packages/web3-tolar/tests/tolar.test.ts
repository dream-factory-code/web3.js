import { assert, expect, should } from 'chai';

import web3 from '../../web3';

const timeoutMs = (time: number) => {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, time);
    });
};
describe("Tolar", function () {
    let _web3: any = new web3("https://tolar.dream-factory.hr");
    let tolar = _web3.tolar;
    it("getBlockCount", async () => {
        let blockCount = await tolar.getBlockCount();
        expect(blockCount).to.be.a("number");
    }).timeout(10000);
    it("sendSignedTx", async () => {
        let receiver = tolar.accounts.privateKeyToAccount(
            "0xff3120706853637455b8a379492bb8d5f94afb94e9746c0d83afee9e688c6686"
        );
        console.log(receiver);
        let sender = tolar.accounts.privateKeyToAccount(
            "0x08bfa59c42886aa4d62376ddc41eacc84b2a8308f4e16c162cca9ca8b4d35c2b"
        );

        let nonce = await tolar.getNonce(sender.address);
        console.log("nonce:\n", nonce, "sender address: \n", sender.address);
        let tx = {
            sender_address: sender.address, //"540dc971237be2361e04c1643d57b572709db15e449a870fef",
            receiver_address: receiver.address, //"5472de4346f7a78fd5e719a00ab03c0aba3e1c5b6113273bde", //receiver.address, //"5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
            amount: 10,
            gas: 24000,
            gas_price: 1,
            data: "datata blabla",
            nonce,
        };
        let signedTx = await sender.signTransaction(tx, sender.privateKey);

        let sentSignedTxHash = await tolar.sendSignedTransaction(signedTx);
        await timeoutMs(20000);
        console.log(await tolar.getTransactionReceipt(sentSignedTxHash));
    }).timeout(50000);
    it("getBlockchainInfo", async () => {
        let blockchainInfo = await tolar.getBlockchainInfo();
        expect(blockchainInfo)
            .to.be.instanceOf(Object)
            .and.haveOwnProperty("confirmed_blocks_count");
        expect(blockchainInfo)
            .to.be.instanceOf(Object)
            .and.haveOwnProperty("total_block_count");
        expect(blockchainInfo)
            .to.be.instanceOf(Object)
            .and.haveOwnProperty("last_confirmed_block_hash");
    }).timeout(30000);
    // it("tolar get transaction list", async () => {
    //     let receiver = tolar.accounts.privateKeyToAccount(
    //         "0xff3120706853637455b8a379492bb8d5f94afb94e9746c0d83afee9e688c6686"
    //     );
    //     let sender = tolar.accounts.privateKeyToAccount(
    //         "0x08bfa59c42886aa4d62376ddc41eacc84b2a8308f4e16c162cca9ca8b4d35c2b"
    //     );
    //     console.log(await tolar.getTransactionList([], 10, 0));
    // }).timeout(30000);
    it("getLatestBalance", async () => {
        let sender = tolar.accounts.privateKeyToAccount(
            "0x08bfa59c42886aa4d62376ddc41eacc84b2a8308f4e16c162cca9ca8b4d35c2b"
        );
        console.log(await tolar.getLatestBalance(sender.address));
    }).timeout(10000);
    it("getGasEstimate", async () => {
        let sender = tolar.accounts.privateKeyToAccount(
            "0x08bfa59c42886aa4d62376ddc41eacc84b2a8308f4e16c162cca9ca8b4d35c2b"
        );
        let receiver = tolar.accounts.privateKeyToAccount(
            "0xff3120706853637455b8a379492bb8d5f94afb94e9746c0d83afee9e688c6686"
        );
        let nonce = await tolar.getNonce(sender.address);
        let tx = {
            sender_address: sender.address, //"540dc971237be2361e04c1643d57b572709db15e449a870fef",
            receiver_address: receiver.address, //"5472de4346f7a78fd5e719a00ab03c0aba3e1c5b6113273bde", //receiver.address, //"5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
            amount: 10,
            gas: 24000,
            gas_price: 1,
            data: "datata blabla",
            nonce,
        };
        console.log(await tolar.getGasEstimate(tx));
    }).timeout(10000);
    it("getBlockByHash and index", async () => {
        let receiver = tolar.accounts.privateKeyToAccount(
            "0xff3120706853637455b8a379492bb8d5f94afb94e9746c0d83afee9e688c6686"
        );
        let blockcount = await tolar.getBlockCount();
        console.log(await tolar.getBalance(receiver.address, blockcount - 1));
        let block = await tolar.getBlockByIndex(blockcount - 1);
        console.log(
            block,
            await tolar.getBlockByHash(block.previous_block_hash)
        );
    }).timeout(10000);
    it("getLatestBalance", async () => {
        let sender = tolar.accounts.privateKeyToAccount(
            "0x08bfa59c42886aa4d62376ddc41eacc84b2a8308f4e16c162cca9ca8b4d35c2b"
        );
        console.log(await tolar.getLatestBalance(sender.address));
    }).timeout(10000);
});
