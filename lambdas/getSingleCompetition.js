const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getItem = async (event) => {
  if (!event.queryStringParameters || !event.queryStringParameters.competition) {
    console.log("Region: ", AWS.config.region);
  }
  let competitionId = event.queryStringParameters?.id;
  console.log("ZONE DANGER", competitionId);
  const params = {
    TableName: "ondebrief-dev",
    // Key: {
    //   PK: competitionId,
    //   SK: competitionId
    // },
    FilterExpression: '#id = :idValue',    
    ExpressionAttributeNames: {
                '#id': 'id'
            },
    ExpressionAttributeValues: {
                ':idValue': event.queryStringParameters?.id,
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
// PK: 'COMPETITION#0eb733be-3f65-4ec3-bdb4-5b6f58288309',
