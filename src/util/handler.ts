import * as debug from "./debug";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export interface CustomAuth {
  authorizer: {
    iam: {
      cognitoIdentity: {
        identityId: string;
      };
    };
  };
}

//: (event: APIGatewayProxyEventV2, context: Context) => any

export default function handler(lambda: any): APIGatewayProxyHandlerV2 {
  return async function (event, context) {
    let body, statusCode;

    // Start debugger
    debug.init(event);

    try {
      // Run the Lambda
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e: any) {
      // Print debug messages
      debug.flush(e);
      body = { error: e.message };
      statusCode = 500;
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
}
