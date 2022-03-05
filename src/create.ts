import handler from "./util/handler";
import * as uuid from "uuid";
import dynamoDb from "./util/dynamodb";
import { APIGatewayProxyEventV2WithRequestContext } from "aws-lambda";

export interface CreateParams {
  TableName: string;
  Item: {
    userId: string;
    noteId: string;
    content: string;
    attachment: string;
    createdAt: number;
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
    const data = JSON.parse(event.body!);
    const params: CreateParams = {
      TableName: process.env.TABLE_NAME!,
      Item: {
        // The attributes of the item to be created
        userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
        noteId: uuid.v1(), // A unique uuid
        content: data.content, // Parsed from request body
        attachment: data.attachment, // Parsed from request body
        createdAt: Date.now(), // Current Unix timestamp
      },
    };

    await dynamoDb.put(params);

    return params.Item;
  }
);
