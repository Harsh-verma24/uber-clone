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