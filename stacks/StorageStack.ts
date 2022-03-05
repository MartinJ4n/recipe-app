import {
  App,
  Stack,
  StackProps,
  Table,
  Bucket,
  TableFieldType,
} from "@serverless-stack/resources";
import { HttpMethods } from "aws-cdk-lib/aws-s3";

export default class StorageStack extends Stack {
  // Public reference to the bucket & table
  public readonly bucket: Bucket;
  public readonly table: Table;

  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const { GET, POST, PUT, DELETE } = HttpMethods;
    const { STRING } = TableFieldType;

    // Create an S3 bucket
    this.bucket = new Bucket(this, "Uploads", {
      s3Bucket: {
        // Allow client side access to the bucket from a different domain
        cors: [
          {
            maxAge: 3000,
            allowedOrigins: ["*"],
            allowedHeaders: ["*"],
            allowedMethods: [GET, POST, PUT, DELETE],
          },
        ],
      },
    });

    // Create the DynamoDB table
    this.table = new Table(this, "Notes", {
      fields: {
        userId: STRING,
        noteId: STRING,
      },
      primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
    });
  }
}
