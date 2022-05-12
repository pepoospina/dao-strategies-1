import { World } from "../../world/World";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

type PullRequestParams = RestEndpointMethodTypes["pulls"]["list"]["response"]["data"];


export async function getPrsInRepo(world: World, repo: { owner: string, repo: string }) {
    if (!(await repoAvailable(world, repo))) { //do once in the strategy level
        throw new Error(`repo ${repo.owner}\\${repo.repo} is not available`);
    }

    let allPulls: PullRequestParams = new Array();
    const iterator = world.github.paginate.iterator(world.github.rest.pulls.list, {
        ...repo,
        state: "all",
        per_page: 100,
    });

    // iterate through each response
    for await (const { data: pulls } of iterator) {
        for (const pull of pulls) {
            allPulls.push(pull);
        }
    }

    return allPulls;
}


export async function getRepoContributors(world: World, repo: { owner: string, repo: string }): Promise<Array<string | undefined>> {
    if (!(await repoAvailable(world, repo))) {
        throw new Error(`repo ${repo.owner}\\${repo.repo} is not available`);
    }

    const response = await world.github.rest.repos.listContributors({ ...repo, });

    if (response.status != 200) {
        throw new Error(`github api get request for contributors in repo ${repo.owner}\\${repo.repo} failed`);
    }

    return response.data.map((contributorData) => contributorData.login);
}


export async function getPullReactions(world: World, repo: { owner: string, repo: string }, pullNum: number) {
    if (!(await repoAvailable(world, repo))) {
        throw new Error(`repo ${repo.owner}\\${repo.repo} is not available`);
    }

    const response = await world.github.rest.reactions.listForIssue({
        ...repo,
        issue_number: pullNum,
    });

    if (response.status != 200) {
        throw new Error(`github api get request for pull request number ${pullNum} in repo ${repo.owner}\\${repo.repo} failed`);
    }
    return response.data;
}

export async function repoAvailable(world: World, repo: { owner: string, repo: string }) {
    try {
        await world.github.rest.repos.get({ ...repo });
    } catch (e) {
        return false;
    }

    return true;
}


export function toTimeStamp(date: string) {
    return (new Date(date).getTime() / 1000);
}