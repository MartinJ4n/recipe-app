import { App } from "@serverless-stack/resources";

import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { FrontendStack } from "./FrontendStack";

export default function main(app: App): void {
  /**
   * Default runtime & environment variables for all functions.
   */
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  app.stack(StorageStack).stack(ApiStack).stack(AuthStack).stack(FrontendStack);
}
