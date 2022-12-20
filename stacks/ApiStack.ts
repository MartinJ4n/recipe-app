import { Api, use, StackContext } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  /**
   * Defining an HTTP API, its Default props & Routes
   */
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET    /recipes": "src/list.main",
      "GET    /recipes/{id}": "src/get.main",
      "POST   /recipes": "src/create.main",
      "PUT    /recipes/{id}": "src/update.main",
      "DELETE /recipes/{id}": "src/delete.main",
    },
  });

  // Show API endpoint in output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
