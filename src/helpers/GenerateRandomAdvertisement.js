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

const randomAdvertisement = () => {
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

export const startAdvertisingRandomOrders = (quPeer) => {
  console.log("STARTING RANDOM GENERATION");
  return postOrderOnTimer(quPeer);
  
}

async function postOrderOnTimer(quPeer) {
  const timer = setInterval(() => {
      quPeer.emit('peer:orderbook', randomAdvertisement());
  }, 1000);
  return () => clearInterval(timer);
}

