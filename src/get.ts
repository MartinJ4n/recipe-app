import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";
import { APIGatewayProxyEventV2WithRequestContext } from "aws-lambda";

export interface GetParams {
  TableName: string;
  Key: {
    userId: string;
    noteId: string | undefined;
  };
}

export interface CustomAuth {
  authorizer: {
    iam: {
      cognitoIdentity: {
        identityId: string;
      };
    };
  };
}

export const main = handler(
  async (event: APIGatewayProxyEventV2WithRequestContext<CustomAuth>) => {
    const params: GetParams = {
      TableName: process.env.TABLE_NAME!,
      // 'Key' defines the partition key and sort key of the item to be retrieved
      Key: {
        userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
        noteId: event.pathParameters!.id, // The id of the note from the path
      },
    };

    const result = await dynamoDb.get(params);
    if (!result.Item) {
      throw new Error("Item not found.");
    }

    // Return the retrieved item
    return result.Item;
  }
);
