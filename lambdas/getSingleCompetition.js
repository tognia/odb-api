const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getItem = async (event, context) => { //pkParam, skParam
  const params = {
    TableName: 'ondebrief-dev', 
    Key: {
      PK: 'COMPETITION#0eb733be-3f65-4ec3-bdb4-5b6f58288309',
      SK: 'COMPETITION#0eb733be-3f65-4ec3-bdb4-5b6f58288309'
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
