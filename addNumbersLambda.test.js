const awsMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
const { addNumbersLambda } = require('./addNumbersLambda');

describe('addNumbersLambda', () => {
  afterEach(() => {
    awsMock.restore('DynamoDB.DocumentClient'); // Restore the DynamoDB mock to make sure it doesn't affect other tests
  });

  it('should add two numbers and mock DynamoDB', async () => {
    const event = { num1: 5, num2: 3 };

    // Mock DynamoDB DocumentClient get method
    awsMock.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
      // Provide a mock response
      callback(null, { Item: { id: 'someId', value: 'mockedValue' } });
    });

    const result = await addNumbersLambda(event, {});
    const parsedResult = JSON.parse(result.body);

    expect(parsedResult.sum).toEqual(8);
    expect(parsedResult.dbResult.Item.value).toEqual('mockedValue');
  });
});
