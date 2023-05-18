const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getItem = async (event, context) => {
  // let {param1, param2 } = event.pathParameters;
  // const { param1, param2 } = event.queryStringParameters;
  let param1 = event.pathParameters.param1;
  let param2 = event.pathParameters.param2;
  console.log(param1, param2);
  const params = {
    TableName: "ondebrief-dev",
    Key: {
      PK: param1,
      SK: param2,
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
// SK: 'COMPETITION#0eb733be-3f65-4ec3-bdb4-5b6f58288309'
