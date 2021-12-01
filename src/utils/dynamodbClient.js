const AWS = require("aws-sdk");

const dynamodbClientParams = {};

if (process.env.IS_OFFLINE) {
  dynamodbClientParams.region = "localhost";
  dynamodbClientParams.endpoint = "http://localhost:8000";
}

const dynamodbClient = new AWS.DynamoDB.DocumentClient(dynamodbClientParams);

module.exports = dynamodbClient;
