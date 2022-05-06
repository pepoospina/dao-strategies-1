import { AccountAndBalance, Strategy } from "../../../types";
import { World } from "../../../world/World";

interface Params {
    repositories: Array<{ owner: string; repo: string }>;
}

const strategy: Strategy = async (
    world: World,
    params: Params
): Promise<AccountAndBalance[]> => {
    const prs = await world.github.rest.pulls.list(params.repositories[0]);
    console.log({ prs });
    return [];
};

export type { Params };
export { strategy };
