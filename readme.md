## The nest.js microservice snippet

This nest.js microservice snippet has included the api-gateway , auth, users, and project microservises crud operations.

## API-gateway

* Transmitting messages between different microservice.
* The api-gateway provides a single endpoint or URL(http://localhost//5000) for the client apps and then internally maps the requests to a group of internal microservices.

## Auth microservice.

* Login with Phone.
* Verify Phone (Use the Twilio SDK for this).

## User microservice.

* List all users.
* Edit user.
* List particular user.
* Delete user.

## Project microservice.

* Add project
* List all projects.
* Edit project.
* List particular project.
* Delete project.

## Requirements
 * Node 16
 * Git
 * Typescript

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/webethics/code-snippet-nest.git
cd code-snippet-nest
```
```bash
cd api-gateway/
npm install
```
```bash
cd user/
npm install
```
```bash
cd projects/
npm install
```
## Create .env in each microservice.

Create `.env` in each microservice and inject your credentials so it looks like this

## For api-gateway
```
MONGO_URI=<mongo_uri>
MONGO_DATABASE=<mongo_dbname>
MONGO_PASSWORD=<mongo_password>
API_GATEWAY_PORT=5000
USER_SERVICE_PORT=5001
AUTH_SERVICE_PORT=5002
PROJECT_SERVICE_PORT=5003
JWT_SECRET=<jwt_secret>
JWT_EXPIREIN=14d
```

## For auth
```
MONGO_URI=<mongo_uri>
MONGO_DATABASE=<mongo_dbname>
MONGO_PASSWORD=<mongo_password>
API_GATEWAY_PORT=5000
AUTH_SERVICE_PORT=5002
TWILIO_ACCOUNT_SID=<twilio_acc_sid>
TWILIO_AUTH_TOKEN=<twilio_auth_token>
TWILIO_VERIFICATION_SERVICE_SID=<twilio_service_sid>
TWILIO_PHONE_NUMBER=<twilio_phone_number>
JWT_SECRET=<jwt_secret>
JWT_EXPIREIN=14d
```

## For user
```
MONGO_URI=<mongo_uri>
MONGO_DATABASE=<mongo_dbname>
MONGO_PASSWORD=<mongo_password>
API_GATEWAY_PORT=5000
USER_SERVICE_PORT=5001
JWT_SECRET=<jwt_secret>
JWT_EXPIREIN=14d
```
## For projects
```
MONGO_URI=<mongo_uri>
MONGO_DATABASE=<mongo_dbname>
MONGO_PASSWORD=<mongo_password>
API_GATEWAY_PORT=5000
PROJECT_SERVICE_PORT=5003
JWT_SECRET=<jwt_secret>
JWT_EXPIREIN=14d
```
 To start the nest server, run the following command in each microservise

```bash
npm run start:dev
```
Final Step:

Open [http://localhost:5000/docs](http://localhost:5000/docs) and take a look around the swagger docs.
