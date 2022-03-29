"use strict";

const axios = require('axios');
const ethers = require('ethers');
const { QuPeer } = require('quswap-protocol');

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

const tokenDayDatas = async () => {
  let response;

  try {
    response = await axios({
      url: requestURL,
      method: 'post',
      data: "{\"query\":\"{\\n  tokenDayDatas(first: 100, orderBy:volumeUSD, where:{date:1648425600}, orderDirection:desc) {\\n\\t\\t\\tid\\n      priceUSD\\n      token {\\n        id\\n        symbol\\n        name\\n        derivedETH\\n      }\\n  }\\n  bundles {\\n    ethPriceUSD\\n  }\\n}\\n\",\"variables\":null}"
    })
  } catch (e) {
    throw new Error(e.message);
  };

  return response?.data.data ? response?.data.data : null;
}

const randomAdvertisement = async () => {
  const allData = await tokenDayDatas();
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
    asks: [{
      gives: [
        {
          address: randomAddress()
        }
      ],
      wants: [
        {
          network: 'ethereum',
          asset: utils.toUtf8Bytes(wantTokenSymbol),
          qty: qty
        }
      ]
    }]
  };

  return randomAd;
}

const startAdvertisingRandomOrders = async () => {
  const signer = ethers.Wallet.createRandom();
  QuPeer.fromPassword({
    signer,
    password: await signer.getAddress()
  }).then(quPeer => postOrderOnTimer(quPeer));
}

function postOrderOnTimer(quPeer) {
  quPeer.start();
  let currentTime = 0;

  setInterval(() => {
      currentTime++;
      randomAdvertisement().then(ad => {
        quPeer.advertise(ad);
      });
  }, 1000);
}

startAdvertisingRandomOrders();
