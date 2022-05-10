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
    //const prs = await world.github.rest.pulls.list(params.repositories[0]);
    //const comments = await world.github.rest.pulls.listReviewComments({
    //    ...params.repositories[0],
    //    pull_number: 1,
    //});
    //const pr = await world.github.rest.pulls.get({
    //    ...params.repositories[0],
    //    pull_number: 1,
    //});
    //const issue_comments = await world.github.rest.issues.listComments({
    //    ...params.repositories[0],
    //    issue_number: 1,
    //});
    //const issue_reatcions = await world.github.rest.reactions.listForIssue({
    //    ...params.repositories[0],
    //    issue_number: 1,
    //});
    //console.log(issue_reatcions);
    //const commit_reactions = await world.github.rest.reactions.listForCommitComment({
    //    ...params.repositories[0],
    //    comment_id: 930015559,
    //});

    //const contributors = await world.github.rest.repos.listContributors({
    //    ...params.repositories[0],
    //});
    //console.log(contributors);
    //let repo = await world.github.rest.repos.get({
    //    ...params.repositories[0]
    //});
    //console.log(repo);

    if (params.timeRange.start >= params.timeRange.end) {
        throw new Error("time params incorrect: start must be smaller than end");
    }

    let scores: Map<string, number>;

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

    let reactionsPerContributor = new Map<string, Array<number>>();
    for (const pull of pullsFiltered) {
        const reactions = await getPullReactions(world, params.repositories[0], pull.number);
        let reactionsNum = 1; // every pull request has a default reaction
        for (const reaction of reactions) {
            if (reaction.content == '+1') {
                reactionsNum += 1;
            }
        }

        const pullCreator: string = pull.user.login;
        reactionsPerContributor.get(pullCreator) != undefined ? reactionsPerContributor.get(pullCreator)?.push(reactionsNum) : reactionsPerContributor.set(pullCreator, [reactionsNum]);
    }

    console.log(pullsFiltered);
    console.log(contributors);
    return {};
};

export type { Params };
export { strategy };
