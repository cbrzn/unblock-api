import { ClientConfigBuilder, PolywrapClient } from "@polywrap/client-js";

export const invoke = () => {
  const config = new ClientConfigBuilder()
    .addDefaults()
    .build();
  const client = new PolywrapClient(config);
  const results: string[] = []

  let result: any;

  // snippets

  results.push(JSON.stringify(result))

  return results
}