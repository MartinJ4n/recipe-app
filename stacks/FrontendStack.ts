import {
  Api,
  App,
  Stack,
  StackProps,
  Auth,
  Bucket,
  ReactStaticSite,
} from "@serverless-stack/resources";

interface FrontendStackProps extends StackProps {
  api: Api;
  auth: Auth;
  bucket: Bucket;
}

export default class FrontendStack extends Stack {
  constructor(scope: App, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    const { api, auth, bucket } = props;

    // Define our React app
    const site = new ReactStaticSite(this, "ReactSite", {
      path: "front-end",
      // Pass in our environment variables
      environment: {
        REACT_APP_API_URL: api.url,
        REACT_APP_REGION: scope.region,
        REACT_APP_BUCKET: bucket.bucketName,
        REACT_APP_USER_POOL_ID: auth.cognitoUserPool!.userPoolId,
        REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
        REACT_APP_USER_POOL_CLIENT_ID:
          auth.cognitoUserPoolClient!.userPoolClientId,
      },
    });

    // Show the url in the output
    this.addOutputs({
      SiteUrl: site.url,
    });
  }
}
