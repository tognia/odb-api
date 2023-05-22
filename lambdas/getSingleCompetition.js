const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const serverless = require("serverless-http");

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getItem = async (event) => {
  
  console.log("BYBYE 2023", event);
  if (!event.pathParameters || !event.pathParameters.competitionId.toString()) {
    // failed without an competitionId
    console.log("Region: ", AWS.config.region);
    return Responses._400({ message: "missing the competitionId from the path" });
  }
  // const competitionId = 'COMPETITION#0eb733be-3f65-4ec3-bdb4-5b6f58288309';
  let competitionId = event.pathParameters.competitionId.toString();
  console.log("ZONE DANGER", competitionId);
  const params = {
    TableName: "ondebrief-dev",
    Key: {
      PK: competitionId,
      SK: competitionId
    },
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
