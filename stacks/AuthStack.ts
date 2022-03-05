import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import {
  Api,
  App,
  Stack,
  StackProps,
  Auth,
  Bucket,
} from "@serverless-stack/resources";

interface AuthStackProps extends StackProps {
  api: Api;
  bucket: Bucket;
}

export default class AuthStack extends Stack {
  // Public reference to the auth instance
  public readonly auth: Auth;

  constructor(scope: App, id: string, props: AuthStackProps) {
    super(scope, id, props);

    const { api, bucket } = props;

    // Create a Cognito User Pool and Identity Pool
    this.auth = new Auth(this, "Auth", {
      cognito: {
        userPool: {
          // Users can login with their email and password
          signInAliases: { email: true },
        },
      },
    });

    this.auth.attachPermissionsForAuthUsers([
      // Allow access to the API
      api,
      // Policy granting access to a specific folder in the bucket
      new PolicyStatement({
        actions: ["s3:*"],
        effect: Effect.ALLOW,
        resources: [
          bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
        ],
      }),
    ]);

    // Show the auth resources in the output
    this.addOutputs({
      Region: scope.region,
      UserPoolId: this.auth.cognitoUserPool!.userPoolId,
      IdentityPoolId: this.auth.cognitoCfnIdentityPool!.ref,
      UserPoolClientId: this.auth.cognitoUserPoolClient!.userPoolClientId,
    });
  }
}
