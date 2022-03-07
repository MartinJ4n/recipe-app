import {
  Api,
  ApiAuthorizationType,
  App,
  Stack,
  StackProps,
  Table,
} from "@serverless-stack/resources";

interface ApiStackProps extends StackProps {
  table: Table;
}

export default class ApiStack extends Stack {
  // Public reference to the API
  public readonly api: Api;

  constructor(scope: App, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const { table } = props;

    // Create the API
    this.api = new Api(this, "Api", {
      defaultAuthorizationType: ApiAuthorizationType.AWS_IAM,
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },

      routes: {
        "GET    /recipes": "src/list.main",
        "GET    /recipes/{id}": "src/get.main",
        "POST   /recipes": "src/create.main",
        "PUT    /recipes/{id}": "src/update.main",
        "DELETE /recipes/{id}": "src/delete.main",
      },
    });

    // Allow the API to access the table
    this.api.attachPermissions([table]);

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
