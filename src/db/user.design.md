# User Model Implementation with NestJS and PostgreSQL

## 1. Database Fields:
<!-- - id: SERIAL PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- email: VARCHAR(255) NOT NULL
- role: ENUM('user', 'admin') NOT NULL DEFAULT 'user'
- address: VARCHAR(255)
- contact: BIGINT
- employer: VARCHAR(255)
- status: ENUM('active', 'reviewed', 'cancelled') DEFAULT 'active' -->
- To be ignored as it already exist on the prisma schema

## 2. Functions:
- `createUser(userDetails)`: This function will create a new user record in the database with the provided user details.
- `getUser(userId)`: This function will retrieve a user's information based on the given user ID.
- `getUsers`: This function will retrieve all users from the database
- `updateUser(userId, updatedDetails)`: This function will update the user's information with the provided details.
- `deleteUser(userId)`: This function will delete a user from the system based on the given user ID.

## 3. Endpoints:
- **POST /users**: This endpoint will be used to create a new user. It will accept a JSON payload containing the user details and call the `createUser` function.
- **GET /users/{userId}**: This endpoint will retrieve the information of a specific user based on the provided user ID. It will call the `getUser` function.
- **GET /users**: This endpoint will retrieve all users from the database. It will call the `getUsers` function.
- **PATCH /users/{userId}**: This endpoint will update the information of a specific user based on the provided user ID. It will accept a JSON payload containing the updated details and call the `updateUser` function.
- **DELETE /users/{userId}**: This endpoint will delete a specific user based on the provided user ID. It will call the `deleteUser` function.

