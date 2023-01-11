## The nest.js microservice snippet

This nest.js microservice snippet has included the api-gateway , auth, users, and project microservises crud operations.

## Verifying users phone numbers in a nest application with Twilio verify

[Twilio Verify](https://www.twilio.com/verify) makes it easier and safer than custom verification systems to verify a user’s phone number. It ensures that the phone number is valid by sending an SMS short code to the number during registration. This can help reduce the amount of fake accounts created and failure rates when sending SMS notifications to users.

## Twilio integration 
You will need your Twilio credentials from the Twilio dashboard to complete the next step. Head over to your [dashboard](https://www.twilio.com/console) and grab your `account_sid` and `auth_token`.

![](https://paper-attachments.dropbox.com/s_F2A8B2F68E4E7251C0E01BC69920BEB8CE8E4B362D8D4BA952FACA12F8136664_1573635422612_Group+8.png)

Navigate to the [Verify](https://www.twilio.com/console/verify) section to create a new [Twilio Verify Service](https://www.twilio.com/console/verify/services). Take note of the `sid` generated for you after creating the Verify service as this will be used for authenticating the instance of the Verify sdk. 

![](https://paper-attachments.dropbox.com/s_F2A8B2F68E4E7251C0E01BC69920BEB8CE8E4B362D8D4BA952FACA12F8136664_1573635718713_Group+10.png)

Update the `.env` file in auth microservice with your Twilio credentials.

  ```
  TWILIO_ACCOUNT_SID=<twilio_acc_sid>
  TWILIO_AUTH_TOKEN=<twilio_auth_token>
  TWILIO_VERIFICATION_SERVICE_SID=<twilio_service_sid>
  TWILIO_PHONE_NUMBER=<twilio_phone_number>
  ```
## API-gateway

* transmitting messages between different microservice.
* The api-gateway provides a single endpoint or URL(http://localhost//5000) for the client apps and then internally maps the requests to a group of internal microservices.

## Auth microservice.

* Send otp request to the number.
* Verify the sended otp and register the user.

## User microservice.

* List all users.
* Edit user.
* List particular user.
* Delete user.

## Projects

* Add project
* List all projects.
* Edit project.
* List particular project.
* Delete project.

## Requirements
 * Node 16
 * Git

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

## For users
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
