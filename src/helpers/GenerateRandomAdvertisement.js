const axios = require('axios')
const ethers = require('ethers')
const { QuPeer } = require('quswap-protocol')
const TokenData = require('./RandomTokens.json')
// import axios from 'axios'
// import {ethers} from 'ethers'
// import { QuPeer } from 'quswap-protocol'

const requestURL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
const utils = ethers.utils;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const randomAddress = () => utils.hexlify(utils.randomBytes(20));
const randomSignature = () => utils.hexlify(utils.randomBytes(65));

const randomAdvertisement = async () => {
  const allData = TokenData;
  const phononPubkey = randomAddress();
  var rOne = getRandomIntInclusive(0, 99);
  const wantTokenSymbol = allData.tokenDayDatas[rOne].token.symbol;
  const qty = getRandomArbitrary(0.01, 100.00);

  const randomAd = {
    phonons: [
      {
        network: "ethereum",
        address: phononPubkey,
        portfolio: {
          assets: [
            {
              network: "ethereum",
              address: phononPubkey
            },
          ],
        },
        hardwareSignature: randomSignature(),
      },
    ],
    asks: [
      {
        gives: [
          {
            address: randomAddress() // phonon pubkey
          }
        ],
        wants: [
          {
            network: 'ethereum',
            asset: utils.toUtf8Bytes(wantTokenSymbol),
            qty: qty
          }
        ]
      }
    ]
  };

  return randomAd;
}

export const createQuPeer = async () => {
  let signer = ethers.Wallet.createRandom();
  let quPeer = await QuPeer.fromPassword({
    signer,
    password: await signer.getAddress()
  })
  quPeer.start()
  return quPeer
}

export const startAdvertisingRandomOrders = async () => {
  console.log("STARTING RANDOM GENERATION")
  let signer = ethers.Wallet.createRandom();
  QuPeer.fromPassword({
    signer,
    password: await signer.getAddress()
  }).then(quPeer => postOrderOnTimer(quPeer));
}

async function postOrderOnTimer(quPeer) {
  await quPeer.start();

  setInterval(() => {
      randomAdvertisement().then(ad => {
        console.log("posting ad");
        quPeer.advertise(ad);
      });
  }, 1000);
}

export async function testRandomGen() {
  let listener = await createQuPeer();
  console.log("Started Listening!");
  listener.on("peer:orderbook", (event)=>{
    console.log("GOT EVENT: ", event)
  });
  startAdvertisingRandomOrders();
}

// testRandomGen();