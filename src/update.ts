import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";
import { APIGatewayProxyEventV2WithRequestContext } from "aws-lambda";

export interface UpdateParams {
  TableName: string;
  Key: {
    userId: string;
    recipeId: string;
  };
  UpdateExpression: string;
  ExpressionAttributeValues: {
    ":attachment": string | null;
    ":content": string | null;
  };
  ReturnValues: string;
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
    const params: UpdateParams = {
      TableName: process.env.TABLE_NAME!,
      // 'Key' defines the partition key and sort key of the item to be updated
      Key: {
        userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
        recipeId: event.pathParameters!.id!, // The id of the recipe from the path
      },
      // 'UpdateExpression' defines the attributes to be updated
      // 'ExpressionAttributeValues' defines the value in the update expression
      UpdateExpression: "SET content = :content, attachment = :attachment",
      ExpressionAttributeValues: {
        ":attachment": data.attachment || null,
        ":content": data.content || null,
      },
      // 'ReturnValues' specifies if and how to return the item's attributes,
      // where ALL_NEW returns all attributes of the item after the update; you
      // can inspect 'result' below to see how it works with different settings
      ReturnValues: "ALL_NEW",
    };

    await dynamoDb.update(params);

    return { status: true };
  }
);
