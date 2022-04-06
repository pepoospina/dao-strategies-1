import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

export const numOf = (str: string): string => {
  return str.replace(/\s/g, '');
};

export const toWei = (str: string): BigNumber => {
  return ethers.utils.parseEther(numOf(str));
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const shouldFail = async (fun: Function): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  await new Promise<void>(async (resolve, reject): Promise<void> => {
    try {
      await fun();
    } catch (e) {
      resolve();
    }
    reject('function execution did not failed');
  });
};
