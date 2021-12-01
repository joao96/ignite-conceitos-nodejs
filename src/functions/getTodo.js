const dynamodbClient = require("../utils/dynamodbClient");

async function handle(event) {
  const { id: user_id } = event.pathParameters;

  try {
    const response = await dynamodbClient
      .query({
        TableName: "todos",
        IndexName: "index_user_id",
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
          ":user_id": user_id,
        },
      })
      .promise();

    const todos = response.Items;

    return {
      statusCode: 201,
      body: JSON.stringify({ todos }),
      headers: {
        "Content-type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
  }
}

module.exports.handle = handle;
