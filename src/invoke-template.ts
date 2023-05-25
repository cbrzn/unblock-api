import { ClientConfigBuilder, PolywrapClient } from "@polywrap/client-js";
import { Workflow } from "./types";

export const invokeWorkflow = async () => {
  const workflow: Workflow = {
    name: "RegisterDomain",
    steps: [
      {
        name: "registerDomain",
        snippet: `
          result = await client.invoke({
            uri: "blabla",
            method: "method",
            args: {
              domain: "namesty.eth",
              owner: "0x..."
            }
          })
        `,
        result: ""
      }
    ]
  }

  let config = new ClientConfigBuilder().addDefaults().build()
  let client = new PolywrapClient(config)
  let result: any;
  let i = 0

  // result = client.invoke...

  workflow.steps[i].result = JSON.stringify(result)
  i++;

  return workflow
}