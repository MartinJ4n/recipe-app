import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";
import { APIGatewayProxyEventV2WithRequestContext } from "aws-lambda";

export interface ListParams {
  TableName: string;
  KeyConditionExpression: string;
  ExpressionAttributeValues: {
    ":userId": string;
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
    const params: ListParams = {
      TableName: process.env.TABLE_NAME!,
      // 'KeyConditionExpression' defines the condition for the query
      // - 'userId = :userId': only return items with matching 'userId'
      //   partition key
      KeyConditionExpression: "userId = :userId",
      // 'ExpressionAttributeValues' defines the value in the condition
      // - ':userId': defines 'userId' to be the id of the author
      ExpressionAttributeValues: {
        ":userId":
          event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      },
    };

    const result = await dynamoDb.query(params);

    // Return the matching list of items in response body
    return result.Items;
  }
);
