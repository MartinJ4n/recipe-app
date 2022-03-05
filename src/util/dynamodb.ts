import AWS from "aws-sdk";
import { GetParams } from "../get";
import { ListParams } from "../list";
import { CreateParams } from "../create";
import { UpdateParams } from "../update";
import { DeleteParams } from "../delete";

const client = new AWS.DynamoDB.DocumentClient();

export default {
  get: (params: GetParams) => client.get(params).promise(),
  query: (params: ListParams) => client.query(params).promise(),
  put: (params: CreateParams) => client.put(params).promise(),
  update: (params: UpdateParams) => client.update(params).promise(),
  delete: (params: DeleteParams) => client.delete(params).promise(),
};
