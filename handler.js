const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getItem = async (event, context) => {
  const params = {
    TableName: 'ondebrief-dev', 
    Key: {
      GSI2PK: 'GROUPS#fb5c87a2-1e19-4ab2-9934-fd1cb21eab3d#2023#group-stage',
      GSI2SK: 'GROUP#TEAM#Dragon de Yaoundé'
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
