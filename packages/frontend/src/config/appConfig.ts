import { invariant } from 'ts-invariant';

export const DEBUG = true;
invariant.log('MODE', import.meta.env.MODE, import.meta.env.DEV);

/** ******************************
 * APP CONFIG:
 ****************************** */
export const SUBGRAPH_URI = 'http://localhost:8000/subgraphs/name/dao-strategies/campaign';
