import * as GH_PR_Weigthed from "./PRWeighted";
import { Params as GH_PR_WeigthedParams } from "./PRWeighted";

/** strategies is an object with all the strategies methods in it. e.g.
 * strategies.GH_PR_Weigthed.strategy() and strategies.GH_PR_Weigthed.gate()
 */
export const strategies = {
  GH_PR_Weigthed: GH_PR_Weigthed,
};

/** StrategiesParams is an interface that wraps the Params interface of all strategies.
 * e.g. strategies.GH_PR_Weigthed.Params
 */
export interface StrategiesParams {
  GH_PR_Weigthed: GH_PR_WeigthedParams;
}
