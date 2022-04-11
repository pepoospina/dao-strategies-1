We need to run a graph-node locally, this is done by running

```
docker-compose up
```

inside the `/services/graph-node` folder.

We had to add

```
extra_hosts:
      - "host.docker.internal:host-gateway"
```

Inside the `docker-compose.yaml` to have access to the localhost from the graph-node process running in the docker container.

The ethereum environment variable

```
ethereum: "hardhat:http://host.docker.internal:8545"
```

has the `hardhat` prefix as this seems to be needed to coincide with the `packages/subgraph.subgraph.yaml`, and the network name in `packages/contracts/hardhat.config.ts`.

Before runing `docker-compose -up`, run `yarn chain` in the root folder.

Once the graph-node is runing (and ipfs and postgres), we can run `yarn create-local` and `yarn deploy-local`.

If you get a ECONNRESET error, then you can set the actual IP address of the graph-node in the `graph create command`. To get the IP of the graph node, run

```
docker ps --format "table {{.ID}}\t{{.Status}}\t{{.Names}}"
```

and note the id of the process `graph-node-graph-node_1`.

And then call

```
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' xxxxxxxxxxx
```

Where `xxxxxxxxxxx` is the id of the process `graph-node-graph-node_1` process listed above.

Once the graph-node is deployed you should see something like

```
Deployed to http://172.18.0.4:8000/subgraphs/name/dao-strategies/campaign/graphql
```
