const Web3 = require('web3')
require('dotenv').config()

let counter = 0

async function getPairCreated(fromBlockNumber) {
    const web3 = new Web3(process.env.BSC_PROVIDER);

    const address = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
    const abi = require('./abi/abifactory.json');

    const pancakeFactory = new web3.eth.Contract(abi, address);
    console.log("--------------------------")
    console.log("Listening to PairCreated()")

    pancakeFactory.events.PairCreated({
        fromBlock: (fromBlockNumber || 0),
    }, eventListener);
}

function eventListener(err, contractEvent) {
    if (err) {
        console.error("ERROR", err);
        return;
    }
    console.log("*********");
    console.log("Catch it!");
    const {
        event,
        returnValues,
        blockNumber,
    } = contractEvent;
    const {
        token0,
        token1,
        pair,
    } = returnValues;
    console.log(`${event}: Pair was created: \nTOKEN0: ${token0} / \nTOKEN1: ${token1} \nPair ADDRESS: ${pair} \n(block #${blockNumber})`);
    counter++;
    console.log(counter, "events were caught during the session")
    console.log("*********");
}

getPairCreated()