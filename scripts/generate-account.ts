/**
 * Generate 100 accounts for testing
 */

import { solidity, MockProvider, deployContract } from 'ethereum-waffle'

import { Contract, BigNumber, constants } from 'ethers'
import BalanceTree from '../src/balance-tree'

import Distributor from '../build/MerkleDistributor.json'
import TestERC20 from '../build/TestERC20.json'
import { parseBalanceMap } from '../src/parse-balance-map'
import fs from "fs";

const ethers =  require('ethers');
const overrides = {
    gasLimit: 9999999,
}

// let provider = new ethers.providers.JsonRpcProvider("https://rpc.testnet.tomochain.com")
// let pkey = "f7933ed7448294ac53d39d40b9a835ecea03a8460c1bb8957cb093ac66573df1"
// let deployWallet = new ethers.Wallet(pkey, provider)

// const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000'
const hundredRandomWallets: any = {};
const accounts: any = [];

// total reward is 100*100 = 10.000
async function generateAddresses() {
    for (let index = 0; index < 100; index++) {
        let randomWallet = ethers.Wallet.createRandom()
        let pkey = randomWallet.privateKey;
        let address = await randomWallet.getAddress();
        hundredRandomWallets[address] = {
            "index": index + 1,
            "earnings": "1000",
            "reasons": "voter",
            "pvk": pkey
        }

        accounts.push(
            { account: address, amount: BigNumber.from("1000") }
        )
    }

    // save the data
    fs.writeFileSync('random_merkle_data.json', JSON.stringify(hundredRandomWallets));
    fs.writeFileSync('accounts_merkle_data.json', JSON.stringify(accounts));
}

async function deploy() {
    // deploy token contract
    let token = "0xBb1648d1a7ebE6ea5CDbc0329174838446037365"
    // deploy the distributor
    // let distributor: Contract
    let tree = new BalanceTree(accounts);
    console.log(tree.getHexRoot())
    fs.writeFileSync('tree_root.json', JSON.stringify(tree.getHexRoot()));
    // distributor = await deployContract(deployWallet, Distributor, [token.address, tree.getHexRoot()],
    //  overrides)
    // console.log("distributor address: ", distributor.address)

    // await token.setBalance(distributor.address, 10000)
}


async function run(){
    await generateAddresses();
    await deploy();
}

run()

// function generateByte32(hexArray: any) {
//     let a = []
//     for (let index = 0; index < hexArray.length; index++) {
//         a.push(
//             Buffer.from(hexArray[index].slice(2),"hex")
//         )
//     }
//     console.log(
//         JSON.stringify(a)
//     )
// }

// generateByte32(['0x6af24662c07b27bc13ab0f8998c896ed58868fe103093c7ccd319f58d252e742', '0x261577a944481dbb25dd02f8cec9f7b8e202d373c0cb3262f6ac96569edc206d', '0xaa5e1dc4b89d86fdd1e583caedeece4819596a018dbdc63cf7d28865baba9fb6', '0x748da173940409d3d247cb2511837e5fa820ea2a7f67b4c12e760c014f76dfdf', '0x396b32724b6b10b303bf1dabc21545784c6188630cb61373262aaf98cfe5052c', '0xf8ff839f6efcf7f86dbe51da0470b16bac7db7536bac6d1ebcb396946a2ce33a', '0x1dbbe75fc2fcefb5d864575f56bb9d5437758663e8f66074511b8c7e81794c3f'])
// console.log([[106,242,70,98,192,123,39,188,19,171,15,137,152,200,150,237,88,134,143,225,3,9,60,124,205,49,159,88,210,82,231,66],
//     [38,21,119,169,68,72,29,187,37,221,2,248,206,201,247,184,226,2,211,115,192,203,50,98,246,172,150,86,158,220,32,109],
//     [170,94,29,196,184,157,134,253,209,229,131,202,237,238,206,72,25,89,106,1,141,189,198,60,247,210,136,101,186,186,159,182],
//     [116,141,161,115,148,4,9,211,210,71,203,37,17,131,126,95,168,32,234,42,127,103,180,193,46,118,12,1,79,118,223,223],
//     [57,107,50,114,75,107,16,179,3,191,29,171,194,21,69,120,76,97,136,99,12,182,19,115,38,42,175,152,207,229,5,44],
//     [248,255,131,159,110,252,247,248,109,190,81,218,4,112,177,107,172,125,183,83,107,172,109,30,188,179,150,148,106,44,227,58],
//     [29,187,231,95,194,252,239,181,216,100,87,95,86,187,157,84,55,117,134,99,232,246,96,116,81,27,140,126,129,121,76,63]
// ])