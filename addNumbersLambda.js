const AWS = require('aws-sdk');

const addNumbersLambda = async (event, context) => {
  // Initialize DynamoDB DocumentClient
  const ddb = new AWS.DynamoDB.DocumentClient();

  const { num1, num2 } = event;

  const sum = num1 + num2;

  // Example DynamoDB getItem call
  const params = {
    TableName: 'MyTable',
    Key: { id: 'someId' },
  };

  try {
    const result = await ddb.get(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ sum, dbResult: result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'DynamoDB error' }),
    };
  }
};

module.exports = {
  addNumbersLambda,
};
