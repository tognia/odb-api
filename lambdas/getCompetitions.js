const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
module.exports.getItems = async (event, context) => {
  const params = {
    TableName: 'ondebrief-dev',
    Limit : 5,
    FilterExpression: '#TYPE = :competitionValue',
    ExpressionAttributeNames: {
      '#TYPE': 'competitionValue',
    },
    ExpressionAttributeValues: {
      ':competitionValue': 'COMPETITION',
    },
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
