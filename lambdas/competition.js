const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getItem = async (event) => {
  if (!event.pathParameters || !event.pathParameters?.id) {
    console.log("PATH PARAMETER ", event.pathParameters?.id);
  }

  const params = {
    TableName: "ondebrief-dev",
    FilterExpression: '#id = :idValue',    
    ExpressionAttributeNames: {
                '#id': 'id'
            },
    ExpressionAttributeValues: {
                ':idValue': event.pathParameters?.id,
            }
  };
  try {
    const result = await dynamoDB.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

