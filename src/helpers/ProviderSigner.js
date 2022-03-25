import { memoize } from 'lodash';
import { ethers } from 'ethers';

export const getProvider = memoize(() => {
  return new ethers.providers.Web3Provider(window.ethereum);
});

export const getSigner = memoize(() => {
  try {
    return getProvider().getSigner();
  } catch (e) {
    return getProvider();
  }
});

export const getSignerAndInitialize = memoize(async () => {
  try {
    const signer = getSigner();
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    return signer;
  } catch (e) {
    return getProvider();
  }
});