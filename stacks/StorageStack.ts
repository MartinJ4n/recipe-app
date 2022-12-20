import { Bucket, Table, StackContext } from "@serverless-stack/resources";

export function StorageStack({ stack }: StackContext) {
  // Create the S3 bucket
  const bucket = new Bucket(stack, "Uploads");
  // Create the DynamoDB table
  const table = new Table(stack, "Recipes", {
    fields: {
      userId: "string",
      recipeId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "recipeId" },
  });

  return {
    bucket,
    table,
  };
}
