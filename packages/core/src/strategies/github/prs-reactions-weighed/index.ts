import { Strategy } from "../../../types";
import { World } from "../../../world/World";
import { getPrsInRepo, getRepoContributors, toTimeStamp, getPullReactions } from "../utils";

interface Params {
    repositories: Array<{ owner: string; repo: string }>;
    timeRange: { start: number, end: number }
}

const strategy: Strategy = async (
    world: World,
    params: Params
) => {
    if (params.timeRange.start >= params.timeRange.end) {
        throw new Error("time params incorrect: start must be smaller than end");
    }

    // get all pulls that were created and merged at the specified time range
    const allPulls = await getPrsInRepo(world, params.repositories[0]);
    const pullsFiltered = allPulls.filter(function (pull) {
        if (pull.merged_at == null) {
            return false;
        }
        return (toTimeStamp(pull.created_at) >= params.timeRange.start &&
            toTimeStamp(pull.created_at) <= params.timeRange.end &&
            toTimeStamp(pull.merged_at) >= params.timeRange.start &&
            toTimeStamp(pull.merged_at) <= params.timeRange.end);
    });

    // get all contributors for the repo
    const contributors = await getRepoContributors(world, params.repositories[0]);

    // get the amount of reactions on every pull request that was made by a contributor
    let reactionsPerContributor = new Map<string, Array<number>>();
    for (const pull of pullsFiltered) {
        const pullCreator: string = pull.user.login;
        let reactionsNum = 1; // every pull has one default reaction 
        const reactions = await getPullReactions(world, params.repositories[0], pull.number);
        for (const reaction of reactions) {
            if (reaction.user?.login != pullCreator && // reaction wasn't made by the creator of the pull
                contributors.includes(reaction.user?.login) && // only reactions by contributors
                reaction.content == '+1') { // only "thumbs up" reactions count
                reactionsNum += 1;
            }
        }

        if (reactionsPerContributor.has(pullCreator)) {
            reactionsPerContributor.get(pullCreator)?.push(reactionsNum);
        }
        else {
            reactionsPerContributor.set(pullCreator, [reactionsNum])
        }
    }

    const scores = new Map<string, number>();
    for (const [contributor, reactions] of reactionsPerContributor.entries()) {
        scores.set(contributor, Math.pow(reactions.reduce((partialSum, num) => partialSum + Math.pow(num, 2), 0), 1 / 2));
    }

    return scores;
};

export type { Params };
export { strategy };
