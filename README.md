# Uber Clone Backend

This is the backend for an Uber clone application, built with Node.js, Express, and MongoDB using Mongoose.

## API Routes

### User Registration

**Endpoint:** `POST /register`

**Description:** Registers a new user in the system. The user's password is hashed before storage for security.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

**Validation Rules:**
- `email`: Must be a valid email address.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 6 characters long.

**Response (Success - 201):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Response (Error - 400):**
```json
{
  "error": [
    {
      "msg": "error_message",
      "param": "field_name"
    }
  ]
}
```

### User Login

**Endpoint:** `POST /login`

**Description:** Authenticates a user by verifying their email and password. If successful, returns a JWT token and user details.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Validation Rules:**
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

**Response (Success - 201):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Response (Error - 400):**
```json
{
  "error": [
    {
      "msg": "error_message",
      "param": "field_name"
    }
  ]
}
```

**Response (Error - 401):**
```json
{
  "message": "Incorrect email and password"
}
```

### User Profile

**Endpoint:** `GET /user/profile`

**Description:** Retrieves the authenticated user's profile information. Requires a valid JWT token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success - 200):**
```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "socketId": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Response (Error - 401):**
```json
{
  "message": "Unauthorized"
}
```

### User Logout

**Endpoint:** `GET /user/logout`

**Description:** Logs out the authenticated user by clearing the authentication cookie. Requires a valid JWT token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success - 200):**
```json
{
  "message": "Logged out successfully"
}
```

**Response (Error - 401):**
```json
{
  "message": "Unauthorized"
}
```

### Driver Registration

**Endpoint:** `POST /driver/register`

**Description:** Registers a new driver in the system. The driver's password is hashed before storage for security. Includes vehicle details for the driver.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "vehicleNumber": "string",
    "vehicleType": "string",
    "vehicleModel": "string",
    "vehicleColor": "string",
    "vehicleCapacity": number
  }
}
```

**Validation Rules:**
- `fullname.firstname`: Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.
- `vehicle.vehicleType`: Required (enum: "car", "bike", "auto").
- `vehicle.vehicleColor`: Required.
- `vehicle.vehicleModel`: Required.
- `vehicle.vehicleNumber`: Must be at least 3 characters long.
- `vehicle.vehicleCapacity`: Must be an integer of at least 1.

**Response (Success - 201):**
```json
{
  "token": "jwt_token_here",
  "driver": {
    "_id": "driver_id",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "vehicleNumber": "string",
      "vehicleType": "string",
      "vehicleModel": "string",
      "vehicleColor": "string",
      "vehicleCapacity": number
    },
    "socketId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Response (Error - 401):**
```json
{
  "error": [
    {
      "msg": "error_message",
      "param": "field_name"
    }
  ]
}
```

**Response (Error - 401):**
```json
{
  "message": "User already exist with this email"
}
```

## Database Schema

### User Model

The user data is stored in a MongoDB collection using the following Mongoose schema:

- **fullname** (Object):
  - **firstname** (String, required, minlength: 3): The user's first name.
  - **lastname** (String, minlength: 3): The user's last name.
- **email** (String, required, unique): The user's email address.
- **password** (String, required, minlength: 6): The hashed password.
- **socketId** (String): Socket ID for real-time features (optional).
- **timestamps** (true): Automatically adds `createdAt` and `updatedAt` fields.

**Methods:**
- `generateAuthToken()`: Generates a JWT token for authentication.
- `comparePassword(password)`: Compares a plain password with the hashed password.
- `hashPassword(password)` (static): Hashes a password using bcrypt.

Data is stored securely with passwords hashed, and email uniqueness enforced.

### Driver Model

The driver data is stored in a MongoDB collection using the following Mongoose schema:

- **fullname** (Object):
  - **firstname** (String, required, minlength: 3): The driver's first name.
  - **lastname** (String, minlength: 3): The driver's last name.
- **email** (String, required, unique): The driver's email address.
- **password** (String, required, minlength: 6, select: false): The hashed password (not selected by default).
- **socketId** (String): Socket ID for real-time features (optional).
- **vehicle** (Object):
  - **vehicleNumber** (String, required): The vehicle's license plate number.
  - **vehicleType** (String, required, enum: ["car", "bike", "auto"]): The type of vehicle.
  - **vehicleModel** (String, required): The vehicle model.
  - **vehicleColor** (String, required): The vehicle color.
  - **vehicleCapacity** (Number, required): The number of passengers the vehicle can carry.
- **timestamps** (true): Automatically adds `createdAt` and `updatedAt` fields.

**Methods:**
- `generateAuthToken()`: Generates a JWT token for authentication.
- `comparePassword(password)`: Compares a plain password with the hashed password.
- `hashPassword(password)` (static): Hashes a password using bcrypt.

Data is stored securely with passwords hashed, and email uniqueness enforced.