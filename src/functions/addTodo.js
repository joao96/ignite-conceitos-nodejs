const dynamodbClient = require("../utils/dynamodbClient");

const { v4: uuidv4 } = require("uuid");

async function handle(event) {
  const { id: user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body);

  const params = {
    TableName: "todos",
    Item: {
      id: uuidv4(),
      user_id,
      title,
      deadline,
      done: false,
    },
  };

  try {
    await dynamodbClient.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
      headers: {
        "Content-type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not add todo.",
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
  }
}

module.exports.handle = handle;
