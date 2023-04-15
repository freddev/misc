__aws lambdas__
retrieves data from a DynamoDB table and returns it as a JSON object:
```javascript
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    try {
        const params = {
            TableName: 'myTable',
        };
        
        const result = await dynamodb.scan(params).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An error occurred' }),
        };
    }
};

```
_fredrik (at) conva se_