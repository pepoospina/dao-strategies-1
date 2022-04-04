import { ethers, BigNumber } from 'ethers';

export const numOf = (str: string): string => {
  return str.replace(/\s/g, '');
};

export const toWei = (str: string): BigNumber => {
  return ethers.utils.parseEther(numOf(str));
};
