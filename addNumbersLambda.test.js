const awsMock = require('aws-sdk-mock');
const { addNumbersLambda } = require('./addNumbersLambda');

describe('addNumbersLambda', () => {
  afterEach(() => {
    awsMock.restore('Lambda');
  });

  it('should add two numbers', async () => {
    const event = { num1: 5, num2: 3 };
    awsMock.mock('Lambda', 'invoke', (params, callback) => {
      callback(null, { Payload: JSON.stringify({ statusCode: 200, body: JSON.stringify({ sum: 8 }) }) });
    });

    const result = await addNumbersLambda(event, {});
    const parsedResult = JSON.parse(result.body);

    expect(parsedResult.sum).toEqual(8);
  });
});
