# Fastify, MongoDB, JWT and Swagger

POC for simple integration between Fastify and MongoDB with Swagger and Postman Docs

### Features

- Authentication using JWT Tokens `@fastify/jwt`
- Endpoint protection using JWT Tokens `@fastify/jwt`
- Seamless integration to MongoDB using `@fastify/mongodb`
- Seamless swagger integration using `@fastify/swagger`

### Import Postman Collection

You could import the postman collection from `./open-api/postman-collection.json` file to start viewing API test cases.

### Postman Collection as DAST step for DevOps pipeline

You can use the postman collection of this project inside devops pipelines as a dynamic application security testing step to automate testing of api auth behaviour and schema validitation. Check out `newman cli` and postman `tests`.
