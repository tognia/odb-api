const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const serverless = require("serverless-http");

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getItem = async (event) => {
  if (!event.queryStringParameters || !event.queryStringParameters.competition) {
    console.log("Region: ", AWS.config.region);
  }
  // const competitionId = 'COMPETITION#0eb733be-3f65-4ec3-bdb4-5b6f58288309';
  // let competitionId = JSON.stringify(event.pathParameters.competitionId);
  let competitionId = event.queryStringParameters?.competition;
  console.log("ZONE DANGER", competitionId);
  const params = {
    TableName: "ondebrief-dev",
    // Key: {
    //   PK: competitionId,
    //   SK: competitionId
    // },
    
    // KeyConditionExpression: '#id = :id',
    ExpressionAttributeNames: {
                '#id': 'id',
            },
    ExpressionAttributeValues: {
                ':id': event.queryStringParameters?.competition,
            }
  };
  try {
    const result = await dynamoDB.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
// PK: 'COMPETITION#0eb733be-3f65-4ec3-bdb4-5b6f58288309',
