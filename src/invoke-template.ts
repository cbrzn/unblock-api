import { ClientConfigBuilder, PolywrapClient } from "@polywrap/client-js";
import { Workflow } from "../src/types";
import { wasmPackage as EnsPackage } from "../src/wraps/ens";

export const invokeWorkflow = async () => {
  const getOwner1 = {
    name: "Get daiakku.eth owner",
    snippet: `
      result = await client.invoke({
        uri: "fs/../../wraps/ens",
        method: "getOwner",
        args: {
          domain: "daiakku.eth",
          registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          connection: {
            networkNameOrChainId: "mainnet"
          }
        }
      })
    `,
  };

  const getOwner2 = {
    name: "Get brazon.eth owner",
    snippet: `
      result = await client.invoke({ uri: "fs/../../wraps/ens", method: "getOwner", args: { domain: "brazon.eth", registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", connection: { networkNameOrChainId: "mainnet" } } })
    `,
  };

  const workflow: Workflow = {
    name: "Check owners",
    steps: [getOwner1, getOwner2],
  };

  const builder = new ClientConfigBuilder();
  builder.addDefaults().addPackage("wrap/ens", EnsPackage);
  let config = builder.build();

  let client = new PolywrapClient(config);
  let result: any;
  let i = 0;

  result = await client.invoke({
    uri: "wrap/ens",
    method: "getOwner",
    args: {
      domain: "daiakku.eth",
      registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      connection: {
        networkNameOrChainId: "mainnet",
      },
    },
  });

  workflow.steps[i].result = JSON.stringify(result);
  i++;
  result = await client.invoke({
    uri: "wrap/ens",
    method: "getOwner",
    args: {
      domain: "brazon.eth",
      registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      connection: {
        networkNameOrChainId: "mainnet",
      },
    },
  });
  workflow.steps[i].result = JSON.stringify(result);

  return workflow;
};
