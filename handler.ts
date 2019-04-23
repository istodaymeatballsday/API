import { APIGatewayProxyHandler } from "aws-lambda"
import { getTodaysMealCode } from "./utils/importantFunctions"

export const api: APIGatewayProxyHandler = async () => {
	return {
		body: JSON.stringify(await getTodaysMealCode()),
		headers: {
			"Access-Control-Allow-Credentials": true,
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "text/html",
		},
		statusCode: 200,
	}
}
