import { APIGatewayProxyHandler } from "aws-lambda";
import { getTodaysMealCode } from "./utils/importantFunctions";

export const api: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(await getTodaysMealCode())
  };
};
