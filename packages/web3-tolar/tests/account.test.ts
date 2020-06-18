import { assert, expect, should } from 'chai';
import { iteratee } from 'underscore';
import { isTopic } from 'web3-utils';

import web3 from '../../web3';

const timeoutMs = (time: number) => {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, time);
    });
};

describe("Tolar account", function () {
    let _web3: any = new web3("https://tolar.dream-factory.hr");
    let tolar = _web3.tolar;
    // it("openRemote", async () => {
    //     let openRemote = await tolar.accounts.openRemote("oldPassword123");
    // }).timeout(10000);
    // // it("listAddresses", async () => {
    // //     let listAddresses = await tolar.accounts.listAddresses();
    // //     expect(listAddresses).to.be.a("array");
    // // }).timeout(10000);
    // // it("verifyAddress", async () => {
    // //     let validAddress = "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb";
    // //     let invalidAddress =
    // //         "5484c312b1ca3d45e7506a772b7358375acc571b2930d27deb";
    // //     let testValid = await tolar.accounts.verifyAddress(validAddress);
    // //     let testInvalid = await tolar.accounts.verifyAddress(invalidAddress);

    // //     assert.throws(
    // //         tolar.accounts.verifyAddress,
    // //         'Invalid number of parameters for "verifyAddress". Got 0 expected 1!'
    // //     );
    // //     assert.throws(() => {
    // //         tolar.accounts.verifyAddress("aa", "bb");
    // //     }, 'Invalid number of parameters for "verifyAddress". Got 2 expected 1!');

    // //     expect(testValid).to.be.true;
    // //     expect(testInvalid).to.be.false;
    // // });
    // // it("createNewAddress", async () => {
    // //     let createNewAddress = await tolar.accounts.createNewAddress(
    // //         "aaa",
    // //         "myPwd",
    // //         "whose pwd?"
    // //     );
    // //     expect(createNewAddress).to.have.lengthOf(50);
    // //     expect(createNewAddress).to.be.a("string").and.match(/^54*/);
    // // }).timeout(30000);
    // // it("create wallet", async () => {
    // //     let acc = tolar.accounts;
    // //     //let newAcc = acc.create();
    // //     //console.log(newAcc.address);
    // //     //let isValid = await acc.verifyAddress(newAcc.address);
    // //     //console.log(newAcc);
    // //     // let addressRecoveres = acc.recover(
    // //     //     "0xe22e9eac97cfa74c9c00951ccf1b6168e885638e94016a64e709224de18f7af7",
    // //     //     "0xb053fcbd9e4720f4a6e431af9d4ec4efc123f60ccd0a3ad2ab06c2e48c5dabad7cb01fa6b4a2be5b23474469710a295b3740d735a11c01feadc24e138721e1fb1",
    // //     //     false
    // //     // );
    // //     // console.log(addressRecoveres);
    // //     //expect(isValid).to.be.true;

    // //     //let wallet = tolar.accounts.wallet;
    // //     // let receiver = wallet.create(1)[0];
    // //     // console.log("wallet keys", Object.keys(wallet));
    // //     // wallet.save("testPassword");
    // //     // wallet = wallet.load("testPassword");
    // //     let receiver = acc.privateKeyToAccount(
    // //         "0xff3120706853637455b8a379492bb8d5f94afb94e9746c0d83afee9e688c6686"
    // //     );
    // //     console.log(receiver);
    // //     let sender = acc.privateKeyToAccount(
    // //         "0x08bfa59c42886aa4d62376ddc41eacc84b2a8308f4e16c162cca9ca8b4d35c2b"
    // //     );
    // //     // let sender = acc.decrypt(
    // //     //     {
    // //     //         address: "84c512b1cf3d45e7506a772b7358375acc571b29",
    // //     //         crypto: {
    // //     //             cipher: "aes-128-ctr",
    // //     //             cipherparams: {
    // //     //                 iv: "26cdcb58f5057c4f3f04468ae9d9b7b1",
    // //     //             },
    // //     //             ciphertext:
    // //     //                 "9177eba69ff70349d52a4c96b6e98eec2717e5e0218d5f4da143b894111681a9",
    // //     //             kdf: "scrypt",
    // //     //             kdfparams: {
    // //     //                 dklen: 32,
    // //     //                 n: 262144,
    // //     //                 p: 1,
    // //     //                 r: 8,
    // //     //                 salt:
    // //     //                     "21f0d2c7eb0cf00d96461bacd023a741ebacfd446fba01b9849399ce32d9a416",
    // //     //             },
    // //     //             mac:
    // //     //                 "963d2541fc26e05b5ff80272632e62060e5394e980b6a31affbaa6f6d09683c4",
    // //     //         },
    // //     //         id: "d90f9e3d-9b1c-cd85-99b7-5161379c97b1",
    // //     //         version: 3,
    // //     //     },
    // //     //     "supersifra"
    // //     // );
    // //     console.log(sender);
    // //     // sender = acc.privateKeyToAccount(
    // //     //     "0x08bfa59c42886aa4d62376ddc41eacc84b2a8308f4e16c162cca9ca8b4d35c2b"
    // //     // );
    // //     // console.log(sender, "\n<---- sender/ receiver---->\n", receiver);
    // //     // let res = wallet.add({
    // //     //     privateKey:
    // //     //         "0xd7ce009203c5d16d6b5daafa1efb1167a9e4558e88dff0bc14ebd65f3f0fc116",
    // //     //     address: "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
    // //     // });
    // //     // console.log(res, wallet);
    // //     // let newAddresses = wallet.create(
    // //     //     2,
    // //     //     "0xd7ce009203c5d16d6b5daafa1efb1167a9e4558e88dff0bc14ebd65f3f0fc116"
    // //     // );
    // //     // newAddresses[0] = acc.privateKeyToAccount(
    // //     //     "0xd7ce009203c5d16d6b5daafa1efb1167a9e4558e88dff0bc14ebd65f3f0fc116"
    // //     // );
    // //     let acc2 = tolar.accounts.privateKeyToAccount(
    // //         "0xd7ce009203c5d16d6b5daafa1efb1167a9e4558e88dff0bc14ebd65f3f0fc116"
    // //     );
    // //     console.log(acc2);

    // //     let nonce = await tolar.getNonce(sender.address);
    // //     console.log("nonce:\n", nonce, "sender address: \n", sender.address);
    // // let tx = {
    // //     sender_address: sender.address, //"540dc971237be2361e04c1643d57b572709db15e449a870fef",
    // //     receiver_address: receiver.address, //"5472de4346f7a78fd5e719a00ab03c0aba3e1c5b6113273bde", //receiver.address, //"5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
    // //     amount: 10,
    // //     gas: 24000,
    // //     gas_price: 1,
    // //     data: "datata blabla",
    // //     nonce,
    // // };
    // //     console.log(tx);

    // //     // let tx2 = {
    // //     //     sender_address:
    // //     //         "547ec363f4d32b1fb3c67b8bf91aacf689943e6e87ae4ae600", //"540dc971237be2361e04c1643d57b572709db15e449a870fef",
    // //     //     receiver_address:
    // //     //         "5456a09d5c06e23ec6a71a7db606549ec4bde1788c71a9552b", //"5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
    // //     //     amount: 0,
    // //     //     gas: 21463,
    // //     //     gas_price: 1,
    // //     //     data: "",
    // //     //     nonce: 0,
    // //     // };
    // //     // //let sha3 = acc.hashMessage(Buffer.from(JSON.stringify(tx)));
    // //     // let txHash = await tolar.getHashHex(tx);
    // //     // //console.log("sha3 =>", sha3);
    // //     // console.log("txHash->", txHash);
    // //     // let signature = sender.sign("0x" + txHash, sender.privateKey);
    // //     // let toFixedHexPlaces = (hex: string, places: number) => {
    // //     //     hex = hex.replace(/^0x/, "");
    // //     //     while (hex.length < places) {
    // //     //         hex = "0" + hex;
    // //     //     }
    // //     //     console.log(hex);
    // //     //     return hex;
    // //     // };
    // //     // //console.log(signature);
    // //     // let signedTx = {
    // //     //     body: tx,
    // //     //     sig_data: {
    // //     //         hash: txHash,
    // //     //         signature:
    // //     //             signature.r.substr(2) +
    // //     //             signature.s.substr(2) +
    // //     //             toFixedHexPlaces(signature.v, 2),
    // //     //         signer_id: signature.signer_id,
    // //     //     },
    // //     // };

    // //     // console.log({
    // //     //     transaction: signedTx,
    // //     // });
    // //     let signedTx = await sender.signTransaction(tx, sender.privateKey);
    // //     console.log(signedTx);
    // //     let sentSignedTx = await tolar.sendSignedTransaction(signedTx);
    // //     console.log("signed remote tx\n", sentSignedTx);
    // //     // //console.log(newAddresses[0].sign);
    // //     // console.log(receiver);

    // //     // let blockcount = await tolar.getBlockCount();
    // //     // console.log(await tolar.getBalance(receiver.address, blockcount - 1));
    // // }).timeout(30000);
    // it("test import export", async () => {
    //     let acc = tolar.accounts;
    //     let address = await acc.createNewAddress();
    //     let pk = await acc.exportKeyFile(address);
    //     console.log(pk);
    //     let res = await acc.importKeyFile(pk);
    //     expect(res).to.be.true;
    // }).timeout(30000);
    // it("list balance per addresses", async () => {
    //     let acc = tolar.accounts;
    //     //let listAddresses = await tolar.accounts.listAddresses();
    //     let result = await acc.listBalancePerAddress();
    //     console.log(
    //         "addresses with ballance",
    //         result //.filter((address: any) => address.balance)
    //         // result
    //     );
    // }).timeout(10000);
    // it("accounts change password", async () => {
    //     let acc = tolar.accounts;
    //     //dont know old pwd
    //     let oldPassword = "";
    //     let newPassword = "testChangePw";
    //     await acc.changePassword(oldPassword, newPassword);
    // }).timeout(30000);
    // it("send deployed contract transaction", async () => {
    //     let accounts = tolar.accounts;
    //     // let deployContractTransaction = [
    //     //     "5493b8597964a2a7f0c93c49f9e4c4a170e0c42a5eb3beda0d",
    //     //     0,
    //     //     "supersifra",
    //     //     "54000000000000000000000000000000000000000023199e2b",
    //     //     6000000,
    //     //     1,
    //     //     "60806040526040805190810160405280600c81526020017f48656c6c6f20576f726c642100000000000000000000000000000000000000008152506000908051906020019061004f929190610062565b5034801561005c57600080fd5b50610107565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a357805160ff19168380011785556100d1565b828001600101855582156100d1579182015b828111156100d05782518255916020019190600101906100b5565b5b5090506100de91906100e2565b5090565b61010491905b808211156101005760008160009055506001016100e8565b5090565b90565b6102d7806101166000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063a413686214610051578063cfae3217146100ba575b600080fd5b34801561005d57600080fd5b506100b8600480360381019080803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061014a565b005b3480156100c657600080fd5b506100cf610164565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010f5780820151818401526020810190506100f4565b50505050905090810190601f16801561013c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b8060009080519060200190610160929190610206565b5050565b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101fc5780601f106101d1576101008083540402835291602001916101fc565b820191906000526020600020905b8154815290600101906020018083116101df57829003601f168201915b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061024757805160ff1916838001178555610275565b82800160010185558215610275579182015b82811115610274578251825591602001919060010190610259565b5b5090506102829190610286565b5090565b6102a891905b808211156102a457600081600090555060010161028c565b5090565b905600a165627a7a7230582005676cc36787b4b0fdaecadf2525768dca9c2503fb3892aec9082426d9aecdb70029",
    //     //     await tolar.getNonce(
    //     //         "5493b8597964a2a7f0c93c49f9e4c4a170e0c42a5eb3beda0d"
    //     //     ),
    //     // ];
    //     const nonce = await tolar.getNonce(
    //         "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb"
    //     );

    //     console.log(nonce);
    //     let res = await accounts.sendDeployContractTransaction(
    //         "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
    //         0,
    //         "supersifra",
    //         6000000,
    //         1,
    //         "60806040526040805190810160405280600c81526020017f48656c6c6f20576f726c642100000000000000000000000000000000000000008152506000908051906020019061004f929190610062565b5034801561005c57600080fd5b50610107565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a357805160ff19168380011785556100d1565b828001600101855582156100d1579182015b828111156100d05782518255916020019190600101906100b5565b5b5090506100de91906100e2565b5090565b61010491905b808211156101005760008160009055506001016100e8565b5090565b90565b6102d7806101166000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063a413686214610051578063cfae3217146100ba575b600080fd5b34801561005d57600080fd5b506100b8600480360381019080803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061014a565b005b3480156100c657600080fd5b506100cf610164565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010f5780820151818401526020810190506100f4565b50505050905090810190601f16801561013c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b8060009080519060200190610160929190610206565b5050565b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101fc5780601f106101d1576101008083540402835291602001916101fc565b820191906000526020600020905b8154815290600101906020018083116101df57829003601f168201915b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061024757805160ff1916838001178555610275565b82800160010185558215610275579182015b82811115610274578251825591602001919060010190610259565b5b5090506102829190610286565b5090565b6102a891905b808211156102a457600081600090555060010161028c565b5090565b905600a165627a7a7230582005676cc36787b4b0fdaecadf2525768dca9c2503fb3892aec9082426d9aecdb70029",
    //         nonce
    //     );
    //     console.log("SEND DEPLOYED CONTRACT TX=>", res);
    // }).timeout(30000);
    // // it("tolar get transaction", async () => {
    // //     let sender = tolar.accounts.privateKeyToAccount(
    // //         "0x08bfa59c42886aa4d62376ddc41eacc84b2a8308f4e16c162cca9ca8b4d35c2b"
    // //     );
    // //     let tx = {
    // //         sender_address: sender.address, //"540dc971237be2361e04c1643d57b572709db15e449a870fef",
    // //         receiver_address:
    // //             "54000000000000000000000000000000000000000023199e2b", //"5472de4346f7a78fd5e719a00ab03c0aba3e1c5b6113273bde", //receiver.address, //"5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
    // //         amount: 0,
    // //         gas: 6000000,
    // //         gas_price: 1,
    // //         data:
    // //             "60806040526040805190810160405280600c81526020017f48656c6c6f20576f726c642100000000000000000000000000000000000000008152506000908051906020019061004f929190610062565b5034801561005c57600080fd5b50610107565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a357805160ff19168380011785556100d1565b828001600101855582156100d1579182015b828111156100d05782518255916020019190600101906100b5565b5b5090506100de91906100e2565b5090565b61010491905b808211156101005760008160009055506001016100e8565b5090565b90565b6102d7806101166000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063a413686214610051578063cfae3217146100ba575b600080fd5b34801561005d57600080fd5b506100b8600480360381019080803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061014a565b005b3480156100c657600080fd5b506100cf610164565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010f5780820151818401526020810190506100f4565b50505050905090810190601f16801561013c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b8060009080519060200190610160929190610206565b5050565b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101fc5780601f106101d1576101008083540402835291602001916101fc565b820191906000526020600020905b8154815290600101906020018083116101df57829003601f168201915b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061024757805160ff1916838001178555610275565b82800160010185558215610275579182015b82811115610274578251825591602001919060010190610259565b5b5090506102829190610286565b5090565b6102a891905b808211156102a457600081600090555060010161028c565b5090565b905600a165627a7a7230582005676cc36787b4b0fdaecadf2525768dca9c2503fb3892aec9082426d9aecdb70029",

    // //         nonce: await tolar.getNonce(sender.address),
    // //     };
    // //     let signedTx = await sender.signTransaction(tx, sender.privateKey);
    // //     let sentSignedTx = await tolar.sendSignedTransaction(signedTx);
    // //     setTimeout(async () => {
    // //         let res = await tolar.getTransaction(sentSignedTx);
    // //         console.log(sentSignedTx, res);
    // //     }, 20000);
    // // }).timeout(30000);
    // it("deploy contract, tryCallTransaction, sendExecuteFunctionTransaction, tryCallTransaction", async () => {
    //     let accounts = tolar.accounts;
    //     const nonce = await tolar.getNonce(
    //         "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb"
    //     );

    //     let txHash = await accounts.sendDeployContractTransaction(
    //         "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
    //         0,
    //         "supersifra",
    //         6000000,
    //         1,
    //         "60806040526040805190810160405280600c81526020017f48656c6c6f20576f726c642100000000000000000000000000000000000000008152506000908051906020019061004f929190610062565b5034801561005c57600080fd5b50610107565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a357805160ff19168380011785556100d1565b828001600101855582156100d1579182015b828111156100d05782518255916020019190600101906100b5565b5b5090506100de91906100e2565b5090565b61010491905b808211156101005760008160009055506001016100e8565b5090565b90565b6102d7806101166000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063a413686214610051578063cfae3217146100ba575b600080fd5b34801561005d57600080fd5b506100b8600480360381019080803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061014a565b005b3480156100c657600080fd5b506100cf610164565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010f5780820151818401526020810190506100f4565b50505050905090810190601f16801561013c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b8060009080519060200190610160929190610206565b5050565b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101fc5780601f106101d1576101008083540402835291602001916101fc565b820191906000526020600020905b8154815290600101906020018083116101df57829003601f168201915b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061024757805160ff1916838001178555610275565b82800160010185558215610275579182015b82811115610274578251825591602001919060010190610259565b5b5090506102829190610286565b5090565b6102a891905b808211156102a457600081600090555060010161028c565b5090565b905600a165627a7a7230582005676cc36787b4b0fdaecadf2525768dca9c2503fb3892aec9082426d9aecdb70029",
    //         nonce
    //     );
    //     await timeoutMs(15000);
    //     let tx = await tolar.getTransaction(txHash);
    //     console.log("TRANSaction", tx);
    //     let tryCallArgs = [
    //         "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
    //         tx.new_address,
    //         0,
    //         600000,
    //         1,
    //         "0xcfae3217",
    //         await tolar.getNonce(
    //             "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb"
    //         ),
    //     ];
    //     let getter = await tolar.tryCallTransaction(...tryCallArgs);
    //     console.log(web3.utils.hexToString("0x" + getter.output));

    //     let execFnArgs = [
    //         "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
    //         tx.new_address,
    //         0,
    //         "supersifra",
    //         600000,
    //         1,
    //         "0xa413686200000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000007426f6b626f6b2100000000000000000000000000000000000000000000000000",
    //         await tolar.getNonce(
    //             "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb"
    //         ),
    //     ];
    //     let setter = await accounts.sendExecuteFunctionTransaction(
    //         ...execFnArgs
    //     );
    //     await timeoutMs(30000);

    //     getter = await tolar.tryCallTransaction(...tryCallArgs);
    //     console.log(setter);
    //     console.log(web3.utils.hexToString("0x" + getter.output));
    // }).timeout(90000);
    // // it("sendFundTransferTransaction", async () => {
    // //     let accounts = tolar.accounts;
    // //     let receiver = tolar.accounts.privateKeyToAccount(
    // //         "0xff3120706853637455b8a379492bb8d5f94afb94e9746c0d83afee9e688c6686"
    // //     );
    // //     let blockcount = await tolar.getBlockCount();
    // //     console.log(await tolar.getBalance(receiver.address, blockcount - 1));
    // //     let fundTx = [
    // //         "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
    // //         receiver.address,
    // //         10,
    // //         "supersifra",
    // //         600000,
    // //         1,
    // //         await tolar.getNonce(
    // //             "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb"
    // //         ),
    // //     ];
    // //     await accounts.sendFundTransferTransaction(...fundTx);
    // //     await timeoutMs(30000);
    // //     blockcount = await tolar.getBlockCount();
    // //     console.log(await tolar.getBalance(receiver.address, blockcount - 1));
    // // }).timeout(60000);
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
            a: "supersifra",
            gas: 9000000,
            gas_price: 1,
            data: "datata blabla",
            nonce,
        };
        //let sentSignedTx = await sender.signTransaction(tx, sender.privateKey);
        let txArray = Object.values(tx);
        let sentSignedTx = await tolar.accounts.sendRawTransaction(...txArray);
        console.log(sentSignedTx);
    }).timeout(10000);
});
