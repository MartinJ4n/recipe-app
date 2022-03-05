import util from "util";
import AWS from "aws-sdk";
//@ts-ignore
let logs;

// Log AWS SDK calls
AWS.config.logger = { log: debug };

export default function debug() {
  logs.push({
    date: new Date(),
    //@ts-ignore

    string: util.format.apply(null, arguments),
  });
}
//@ts-ignore

export function init(event) {
  logs = [];

  // Log API event
  //@ts-ignore

  debug("API event", {
    body: event.body,
    pathParameters: event.pathParameters,
    queryStringParameters: event.queryStringParameters,
  });
}
//@ts-ignore

export function flush(e) {
  //@ts-ignore

  logs.forEach(({ date, string }) => console.debug(date, string));
  console.error(e);
}
