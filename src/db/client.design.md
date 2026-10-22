# Client Model Implementation with NestJS and PostgreSQL

## 1. Database Fields:
<!-- - id: SERIAL PRIMARY KEY
- name: VARCHAR(255) NOT NULL
- employee_id: VARCHAR(255) NOT NULL
- email: VARCHAR(255) NOT NULL
- phone_number: BIGINT
- status: ENUM('active', 'reviewed', 'cancelled') DEFAULT 'active' -->
- To be ignored as it already exist on the prisma schema

## 2. Functions:
- `createClient(clientDetails)`: This function will create a new client record in the database with the provided client details.
- `getClient(clientId)`: This function will retrieve a client's information based on the given client ID.
- `getClients`: This function will retrieve all clients from the database.
- `updateClient(clientId, updatedDetails)`: This function will update the client's information with the provided details.
- `deleteClient(clientId)`: This function will delete a client from the system based on the given client ID.

## 3. Endpoints:
- **POST /clients**: This endpoint will be used to create a new client. It will accept a JSON payload containing the client details and call the `createClient` function.
- **GET /clients/{clientId}**: This endpoint will retrieve the information of a specific client based on the provided client ID. It will call the `getClient` function.
- **GET /clients**: This endpoint will retrieve all clients from the database. It will call the `getClients` function.
- **PATCH /clients/{clientId}**: This endpoint will update the information of a specific client based on the provided client ID. It will accept a JSON payload containing the updated details and call the `updateClient` function.
- **DELETE /clients/{clientId}**: This endpoint will delete a specific client based on the provided client ID. It will call the `deleteClient` function.

