import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";
import { APIGatewayProxyEventV2WithRequestContext } from "aws-lambda";

export interface DeleteParams {
  TableName: string;
  Key: {
    userId: string;
    recipeId: string;
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
    const params: DeleteParams = {
      TableName: process.env.TABLE_NAME!,
      // 'Key' defines the partition key and sort key of the item to be removed
      Key: {
        userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
        recipeId: event.pathParameters!.id!, // The id of the recipe from the path
      },
    };
    await dynamoDb.delete(params);

    return { status: true };
  }
);
