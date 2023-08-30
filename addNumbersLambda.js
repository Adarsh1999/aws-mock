const AWS = require('aws-sdk');

const addNumbersLambda = async (event, context) => {
  const { num1, num2 } = event;

  const sum = num1 + num2;

  return {
    statusCode: 200,
    body: JSON.stringify({ sum }),
  };
};

module.exports = {
  addNumbersLambda,
};
