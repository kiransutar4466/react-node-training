## Node.js REST API with Express.js  

This project is a REST API built with Node.js and Express.js for performing CRUD operations on a static in-memory array. The API manages simple user objects and includes authentication using JWT.

### Dependencies  
- `uuid` – For generating unique user IDs  
- `nodemon` – For automatic server restart during development  
- `bcrypt` – For password hashing  
- `dotenv` – For environment variable management  
- `jsonwebtoken` – For JWT-based authentication  

### API Endpoints  

#### Public Endpoints  
- **POST /** – Adds a new user to the array.  
  - **Request Payload:** `firstName`, `lastName`, `email`, `password`, `gender`  

- **POST /loginUser** – Authenticates a user.  
  - **Request Payload:** `email`, `password`  
  - **Response:** `Message, Token`


#### Protected JWT Endpoints  
- **POST /users** – Adds a new user.  
  - **Request Payload:** `firstName`, `lastName`, `email`, `password`, `gender`  

- **GET /users** – Retrieves all users.  

- **GET /users/:id** – Fetches a user by ID.  

- **PUT/PATCH /users/:id** – Updates user details.  

- **DELETE /users/:id** – Deletes a user.  


### Add Proper Error Messages For Each API


### Project Setup  

#### Check Node.js Version  
Ensure you are using Node.js version **22.0.0**:  
* node -v

#### Install Dependencies  
Run the following command to install required packages:  
* npm install


#### Configure Environment Variables  
Create a `.env` file based on `.env.example` and add necessary configurations.  

#### Start the Server  
To run the application, use:  
* npm start


#### Update Documentation  
Ensure that the `README.md` file reflects the latest changes.
