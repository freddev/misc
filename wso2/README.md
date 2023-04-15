__wso2__
1. Install WSO2 API Manager on your system.
2. Open the API Manager Publisher web interface and log in with your credentials.
3. Create a new API and define its endpoints, resources, and operations.
4. Configure security and rate limiting policies for the API.
5. Publish the API to the API Manager Store web interface.
6. Test the API using a REST client or other testing tool, and verify that the API is functioning as expected.

Here's an example of a simple REST API that exposes a greeting service:

1. Open the API Manager Publisher web interface and log in with your credentials.
2. Create a new API and specify its basic details such as name, version, context, and endpoint URL.
3. Define a resource called greeting and create a GET operation for it.
4. Specify the endpoint URL for the operation, which will be used to forward the request to the backend service.
5. Configure security for the API by selecting the appropriate security scheme (such as OAuth2 or Basic Auth) and defining the credentials.
6. Publish the API to the API Manager Store web interface.

Here's an example of what the Swagger definition for the API might look like:
```yaml
swagger: '2.0'
info:
  title: My Greeting API
  version: '1.0'
host: localhost:8280
basePath: /greeting
schemes:
  - http
paths:
  /hello:
    get:
      summary: Get a greeting message
      description: Returns a greeting message with the given name
      produces:
        - application/json
      parameters:
        - name: name
          in: query
          description: Name of the person to greet
          required: true
          type: string
      responses:
        '200':
          description: OK
          schema:
            type: object
            properties:
              message:
                type: string
                description: The greeting message

```
This Swagger definition describes an API with a single resource (/hello) that accepts a query parameter called name. The API returns a JSON object with a single property called message, which contains the greeting message.
This is just a simplified example, but it demonstrates how to create a basic REST API using WSO2 API Manager. By defining more complex resources, operations, and security policies, you can build powerful and scalable APIs with WSO2.

_fredrik (at) conva se_
