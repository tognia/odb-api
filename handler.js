const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getItem = async (event, context) => { //pkParam, skParam
  // let {param1, param2 } = event.pathParameters;
  const { param1, param2 } = event.queryStringParameters;
  console.log({param1}, {param2});
  const params = {
    TableName: 'ondebrief-dev', 
    Key: {
      PK: param1.toString(),
      SK: param2.toString()
    }
  };
  try {
    const result = await dynamoDB.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};
